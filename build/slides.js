var fs = require('fs');
var path = require('path');

var template = require('lodash').template;
var escapeHtml = require('escape-html');
var s = require('string');


function removeExerciseMarkers(contents) {
  return contents.split('\n').filter(function(line){
    return !(s(line).contains('ex:start') || s(line).contains('ex:end'));
  }).join('\n');
}

function includeCode(codePath, fragment) {

  var contents = fs.readFileSync(path.join(__dirname, '..', codePath)).toString();
  var fragmentLines = [], fragmentName;
  var fragments = {
    full: contents
  };
  fragment = fragment || 'full';

  var contentLines = contents.split('\n');
  contentLines.forEach(function (line) {
    if (s(line).contains('slide:start:')) {
      fragmentName = s(line).between('slide:start:', ';');
    } else if (s(line).contains('slide:end')) {
      fragments[fragmentName] = fragmentLines.join('\n');
      fragmentLines.length = 0;
      fragmentName = undefined;
    } else {
      if (fragmentName) {
        fragmentLines.push(line);
      }
    }
  });

  return escapeHtml(removeExerciseMarkers(fragments[fragment]));
}

function includeSlides(slidePath) {
  return template(fs.readFileSync(path.join(__dirname, '../presentation/tpls', slidePath)).toString(), {
    includeCode: includeCode
  });
}

module.exports = {
  includeCode: includeCode,
  includeSlides: includeSlides
}