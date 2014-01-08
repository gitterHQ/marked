/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var marked = require('..');

function runStaticTest(file) {
  return function() {
    var engine = marked;
    var fileName = path.join(__dirname, 'tests', file);

    var text = fs.readFileSync(fileName, 'utf8');
    var html = fs.readFileSync(fileName.replace(/[^.]+$/, 'html'), 'utf8');

    var generated = engine(text);
    var generatedNoWhitespace = generated.replace(/\s/g, '');
    var htmlNoWhitespace = html.replace(/\s/g, '');

    assert.equal(generatedNoWhitespace, htmlNoWhitespace);
  };
}

describe('static', function() {
  var list = fs
    .readdirSync(path.join(__dirname, 'tests'))
    .filter(function(file) {
      return path.extname(file) !== '.html';
    })
    .filter(function(file) {
      // Ignore broken tests
      return file != 'def_blocks.text' && file != 'double_link.text' && file != 'gfm_code_hr_list.text';
    })
    .sort(function(a, b) {
      a = path.basename(a).toLowerCase().charCodeAt(0);
      b = path.basename(b).toLowerCase().charCodeAt(0);
      return a > b ? 1 : (a < b ? -1 : 0);
    });

  list.forEach(function(file) {
    it(file, runStaticTest(file));
  });

});
