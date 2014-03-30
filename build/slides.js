var fs = require('fs');
var path = require('path');

var template = require('lodash').template;
var s = require('string');


function trimLeadingWS(contents) {
  var lines = contents.split('\n');
  if (lines.length > 0) {
    var leadingWS = lines[0].length - lines[0].replace(/^\s+/, '').length;
    if (leadingWS) {
      return lines.map(function(line){
        return line.substr(leadingWS-1);
      }).join('\n');
    }
  }

  return contents;
}

function removeExerciseMarkers(contents) {
  return (contents || '').split('\n').filter(function(line){
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

  return s(trimLeadingWS(removeExerciseMarkers(fragments[fragment]))).escapeHTML().toString();
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