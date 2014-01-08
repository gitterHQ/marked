/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('..');

function getDefaultOptions() {
  return { gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };
}

describe('unicode', function() {
  it('should handle other languages', function() {
    var text = '## 中文';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var renderer = new marked.Renderer();
    var tokens = lexer.lex(text);
    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(html, '<h2>中文</h2>\n');
  });

});
