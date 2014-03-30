var gutil = require('gulp-util');
var PluginError = require('gulp-util').PluginError;
var s = require('string');
var through = require('through2');

module.exports = function () {

  function processSolution(file, enc, cb) {

    var targetLines = [];
    var inExercise = false;

    gutil.log('Preparing exercises for: ' + file.path);

    try {

      String(file.contents).split('\n').forEach(function (line) {
        if (s(line).contains('ex:start')) {
          inExercise = true;
        } else if (s(line).contains('ex:end')) {
          inExercise = false;
        } else {
          if (!inExercise && !s(line).contains('slide:')) {
            targetLines.push(line);
          }
        }
      });

      file.contents = new Buffer(targetLines.join('\n'));
      file.path = s(file.path).replaceAll('/solution', '').toString();

    } catch (e) {
      this.emit('error', e);
    }

    this.push(file);
    cb();
  }

  return through.obj(processSolution);
};