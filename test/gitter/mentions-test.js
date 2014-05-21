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


describe('mentions', function() {
  it('should deal with mentions followed by commas', function() {
    var text = '@suprememoocow, how are you?';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var mentions = 0;
    var renderer = new marked.Renderer();

    renderer.mention = function(href, title, text) {
      mentions++;
      assert.equal(href, 'suprememoocow');
      assert.equal(text, '@suprememoocow');
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(mentions, 1);
    // assert.equal(html, '<p>Deal with <a href="#" data-link-type="issue" data-issue="123" class="issue">#123</a></p>\n');
  });

});
