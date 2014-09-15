/*jslint node: true */
/*global describe:true, it: true, beforeEach:true, afterEach:true */
"use strict";

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var util = require('util');
var marked = require('../..');

function getDefaultOptions() {
  return { gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };
}


describe('groupmentions', function() {
  it('should deal with groupmentions followed by commas', function() {
    var text = '@@all, how are you?';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var mentions = 0;
    var renderer = new marked.Renderer();

    renderer.groupmention = function(name, text) {
      mentions++;
      assert.equal(name, 'all');
      assert.equal(text, '@@all');
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(mentions, 1);
  });

  it('should deal with text followed by groupmentions', function() {
    var text = 'how are you @@all how are you?';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var mentions = 0;
    var renderer = new marked.Renderer();

    renderer.groupmention = function(name, text) {
      mentions++;
      assert.equal(name, 'all');
      assert.equal(text, '@@all');
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(mentions, 1);
  });

});
