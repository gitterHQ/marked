/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('../..');

function getDefaultOptions() {
  return { headerPrefix: 'test', gfm: true, skipComments: true };
}

function gitterMarkdown(text) {
  var options = { headerPrefix: 'test', gfm: true, skipComments: true };

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);

  var parser = new marked.Parser(options);

  return parser.parse(tokens).trim();
}

describe('comments', function() {
  it('should be able to skip comments', function() {
    assert.equal('', gitterMarkdown('<!-- Hello -->'));
  });
});
