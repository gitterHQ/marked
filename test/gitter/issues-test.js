var assert = require('assert');
var marked = require('../..');
var util = require('util');

function getDefaultOptions() {
  return { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };
}

function gitterMarkdown(text) {

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);

  var options = { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true, skipComments: true };

  var parser = new marked.Parser(options);

  return parser.parse(tokens).trim();
}

describe('issues', function() {

  it('should treat issues as text not headers', function() {
    assert.equal('<p><a href="#" data-link-type="issue" data-issue="#12345">#12345</a></p>', gitterMarkdown("#12345"));
  });

  it('should treat headers as not headers', function() {
    assert.equal('<h1 id="test12345">12345</h1>', gitterMarkdown("# 12345"));
  });

  it('should read simple issues', function() {
    var text = 'Deal with #123';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var issues = 0;
    var renderer = new marked.Renderer();
    renderer.issue = function(repo, issue, text) {
      issues++;
      assert(!repo);
      assert.equal(issue, '123');
      assert.equal(text, '#123');
      return util.format('<a href="#" data-link-type="issue" data-issue="%s" class="issue">%s</a>', issue, text);
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(issues, 1);
    assert.equal(html, '<p>Deal with <a href="#" data-link-type="issue" data-issue="123" class="issue">#123</a></p>\n');
  });

  it('should read repo issues', function() {
    var text = 'Deal with a/b#123';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var issues = 0;
    var renderer = new marked.Renderer();
    renderer.issue = function(repo, issue, text) {
      issues++;
      assert.equal(repo, 'a/b');
      assert.equal(issue, '123');
      assert.equal(text, 'a/b#123');
      return util.format('<a href="#" data-link-type="issue" data-issue="%s" data-issue-repo="%s" class="issue">%s</a>', issue, repo, text);
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(issues, 1);
    assert.equal(html, '<p>Deal with <a href="#" data-link-type="issue" data-issue="123" data-issue-repo="a/b" class="issue">a/b#123</a></p>\n');
  });


  it('should read multiple repo issues', function() {
    var text = 'Deal with a/b#123 #456 yeah';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var issues = 0;
    var renderer = new marked.Renderer();
    renderer.issue = function(repo, issue, text) {
      issues++;
      switch(issue) {
        case '123':
          assert.equal(repo, 'a/b');
          assert.equal(text, 'a/b#123');
          break;
       case '456':
         assert(!repo);
         assert.equal(text, '#456');
         break;

      }
      return util.format('<issue>%s</issue>', text);
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(issues, 2);
    assert.equal(html, '<p>Deal with <issue>a/b#123</issue> <issue>#456</issue> yeah</p>\n');
  });

});