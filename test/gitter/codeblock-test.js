var assert = require('assert');
var marked = require('../..');

function gitterMarkdown(text) {
  var options = { headerPrefix: 'test', gfm: true, tables: true, sanitize: true, breaks: true, linkify: true, skipComments: true };

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);

  var parser = new marked.Parser(options);

  return parser.parse(tokens).trim();
}

describe('links', function() {

  it('should handle code blocks', function() {
    assert.equal('<p><code>hello();</code></p>',
      gitterMarkdown("```hello();```"));
  });

  it('should handle multiline code blocks', function() {
    assert.equal('<pre><code>hello();\nworld();\n</code></pre>',
      gitterMarkdown("```\nhello();\nworld();\n```"));
  });

  it('should handle inline backtick style code blocks', function() {
    assert.equal('<p>why <code>hello()</code> there world</p>',
      gitterMarkdown("why `hello()` there world"));
  });


});