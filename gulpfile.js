var gulp = require('gulp');
var gutil = require('gulp-util');
var template = require('gulp-template');
var jshint = require('gulp-jshint');
var lodash = require('lodash');

var connect = require('connect');
var http = require('http');
var path = require('path');
var fs = require('fs');
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
    'exercises/lib/jquery-1.10.2.js',
    'exercises/lib/moment.js',
    'exercises/lib/angular.js',
    'exercises/lib/angular-mocks.js',
    'exercises/**/solution/*.js',
    'exercises/**/solution/*.tpl.html'
  ],
  frameworks: ['jasmine'],
  preprocessors: {
    '**/*.html': ['ng-html2js']
  },
  ngHtml2JsPreprocessor: {
    cacheIdFromPath: function(filepath) {
      return path.basename(filepath);
    },
    moduleName: 'templates'
  }
};

gulp.task('test', function () {
  karma.start(lodash.assign({}, karmaDefaultConf, {singleRun: true}), karmaExit);
});

gulp.task('tdd', function () {
  karma.start(lodash.assign({}, karmaDefaultConf), karmaExit);
});

gulp.task('lint', function() {
  gulp.src('exercises/**/solution/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Gulp tasks
gulp.task('default', ['lint', 'test']);

gulp.task('www', function () {

  var port = 8005;

  var app = connect();
  app.use(connect.static(__dirname + '/exercises'));
  app.use(connect.directory(__dirname + '/exercises'));

  gutil.log('Starting WWW server at http://localhost:' + port);
  http.createServer(app).listen(port);
});
