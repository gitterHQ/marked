var jsdiff = require('diff');
var clc = require('cli-color');

function textDiff(a, b) {
  var diff = jsdiff.diffLines(a, b);

  var hasDifferences = diff.some(function(part) {
    return part.added || part.removed;
  });

  if(hasDifferences) {
    var message = "";

    if(diff.length === 2 && diff[0].added && diff[1].removed) {
      var lineDiff = jsdiff.diffChars(diff[0].value, diff[1].value);
      lineDiff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        var color = part.added ? 'green' : part.removed ? 'red' : 'white';
        message += clc[color](part.value);
      });
      message += "\n";
    } else {
      diff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        var color = part.added ? 'green' :
          part.removed ? 'red' : 'white';

        message += clc[color](part.value);
      });
    }

    throw new Error(message);
  }
}

module.exports = textDiff;