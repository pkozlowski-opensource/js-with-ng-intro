var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template');
var lodash = require('lodash');

var connect = require('connect');
var http = require('http');
var karma = require('karma').server;

var exercise = require('./build/exercises.js');
var slides = require('./build/slides.js');

//Karma runner configuration
function karmaExit(exitCode) {
  gutil.log('Karma has exited with ' + exitCode);
  process.exit(exitCode);
}

var karmaDefaultConf = {
  browsers: ['Chrome'],
  files: [
    'exercises/lib/angular.js',
    'exercises/lib/angular-mocks.js',
    'exercises/**/solution/*.js'],
  frameworks: ['jasmine']
};

//Gulp tasks
gulp.task('default', ['test']);

gulp.task('www', function () {

  var app = connect();
  app.use(connect.static(__dirname + '/exercises'));
  app.use(connect.directory(__dirname + '/exercises'));

  gutil.log('Starting WWW server at http://localhost:8000');
  http.createServer(app).listen(8000);
});

gulp.task('test', function () {
  karma.start(lodash.assign({}, karmaDefaultConf, {singleRun: true}), karmaExit);
});

gulp.task('tdd', function () {
  karma.start(lodash.assign({}, karmaDefaultConf), karmaExit);
});

// internal helper tasks - to be deleted before the presentation

gulp.task('slides', function () {
  gulp.src('presentation/tpls/index.html')
    .pipe(template(slides))
    .pipe(gulp.dest('presentation'));
});

gulp.task('slidesw', function () {
  gulp.watch(['presentation/index.html', 'presentation/tpls/**/*.*'], ['slides']);
});

gulp.task('exercises', function () {
  gulp.src('exercises/**/solution/*.*').pipe(exercise()).pipe(gulp.dest('exercises'));
});
