var assert = require('assert');

describe('issues', function() {

  it('should treat issues as text not headers', function() {
    var marked = require('../..');

    var lexer = new marked.Lexer(options);

    var tokens = lexer.lex("#12345");

    var options = { gfm: true, tables: true, sanitize: true, breaks: true, linkify: true, skipComments: true };

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens).trim();

    assert.equal('<p>#12345</p>', html);
  });

  it('should treat headers as not headers', function() {
    var marked = require('../..');

    var lexer = new marked.Lexer(options);

    var tokens = lexer.lex("# 12345");

    var options = { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true, skipComments: true };

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens).trim();

    assert.equal('<h1 id="test12345">12345</h1>', html);
  });


});