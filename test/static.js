/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var marked = require('..');
var textDiff = require('./diff');

function getOptionsFromFilename(filename) {
  var flags = filename.split('.').slice(1, -1);
  if(!flags.length) return {};

  var options = {};

  // marked._original = marked.defaults;
  // marked.defaults = {};
  // Object.keys(marked._original).forEach(function(key) {
  //   marked.defaults[key] = marked._original[key];
  // });
  flags.forEach(function(key) {
    var val = true;
    if (key.indexOf('no') === 0) {
      key = key.substring(2);
      val = false;
    }
    options[key] = val;
  });

  return options;
}

function runStaticTest(file) {
  return function() {
    var engine = marked;
    var fileName = path.join(__dirname, 'tests', file);

    var text = fs.readFileSync(fileName, 'utf8');
    var html = fs.readFileSync(fileName.replace(/[^.]+$/, 'html'), 'utf8');

    var options = getOptionsFromFilename(file);

    var generated = engine(text, options);
    var generatedNoWhitespace = generated.replace(/\s/g, '');
    var htmlNoWhitespace = html.replace(/\s/g, '');

    textDiff(htmlNoWhitespace, generatedNoWhitespace);
  };
}

describe('static', function() {
  var list = fs
    .readdirSync(path.join(__dirname, 'tests'))
    .filter(function(file) {
      return path.extname(file) !== '.html' && !file.match(/\.disabled/);
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
