var assert = require('assert');
var marked = require('../..');

function gitterMarkdown(text) {

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);

  var options = { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true, skipComments: true };

  var parser = new marked.Parser(options);

  return parser.parse(tokens).trim();
}

describe('issues', function() {

  it('should treat issues as text not headers', function() {
    assert.equal('<p><a href="#" data-link-type="issue" data-issue="12345">#12345</a></p>', gitterMarkdown("#12345"));
  });

  it('should treat headers as not headers', function() {
    assert.equal('<h1 id="test12345">12345</h1>', gitterMarkdown("# 12345"));
  });


});