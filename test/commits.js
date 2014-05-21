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


describe('commit', function() {
  it('should read full commits', function() {
    var text = 'Deal with bob/project@65fead6e3720247a13ca7b29b998fa94eb849508';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var commits = 0;
    var renderer = new marked.Renderer();
    renderer.commit = function(repo, sha, text) {
      commits++;
      assert.equal(repo, 'bob/project');
      assert.equal(sha, '65fead6e3720247a13ca7b29b998fa94eb849508');
      assert.equal(text, 'bob/project@65fead6e3720247a13ca7b29b998fa94eb849508');
      return util.format('<a href="#" data-link-type="commit" data-commit="%s" class="commit">%s</a>', sha, text);
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(commits, 1);
    assert.equal(html, '<p>Deal with <a href="#" data-link-type="commit" data-commit="65fead6e3720247a13ca7b29b998fa94eb849508" class="commit">bob/project@65fead6e3720247a13ca7b29b998fa94eb849508</a></p>\n');
  });

  it('should read short commits', function() {
    var text = 'Deal with jane/site@b849508';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var commits = 0;
    var renderer = new marked.Renderer();
    renderer.commit = function(repo, sha, text) {
      commits++;
      assert.equal(repo, 'jane/site');
      assert.equal(sha, 'b849508');
      assert.equal(text, 'jane/site@b849508');
      return util.format('<a href="#" data-link-type="commit" data-commit="%s" data-commit-repo="%s" class="commit">%s</a>', sha, repo, text);
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(commits, 1);
    assert.equal(html, '<p>Deal with <a href="#" data-link-type="commit" data-commit="b849508" data-commit-repo="jane/site" class="commit">jane/site@b849508</a></p>\n');
  });

  it('should read multiple commits', function() {
    var text = 'Deal with jane/site@b849508 bob/project@65fead6 yeah';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var commits = 0;
    var renderer = new marked.Renderer();
    renderer.commit = function(repo, sha, text) {
      commits++;
      switch(sha) {
        case 'b849508':
          assert.equal(repo, 'jane/site');
          assert.equal(text, 'jane/site@b849508');
          break;
       case '65fead6':
          assert.equal(repo, 'bob/project');
          assert.equal(text, 'bob/project@65fead6');
          break;

      }
      return util.format('<commit>%s</commit>', text);
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(commits, 2);
    assert.equal(html, '<p>Deal with <commit>jane/site@b849508</commit> <commit>bob/project@65fead6</commit> yeah</p>\n');
  });

});
