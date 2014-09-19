/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('../..');

function getDefaultOptions() {
  return { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };
}

describe('email-detection', function() {
  it('should not detect emails inside code-blocks', function() {
    var text = 'this `is@broken`';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var renderer = new marked.Renderer();

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(html, '<p>this <code>is@broken</code></p>\n');
  });

});
