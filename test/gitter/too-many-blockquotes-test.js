var assert = require('assert');
var marked = require('../..');

function gitterMarkdown(text) {
  var options = {
    maxBlockQuoteDepth: 1
  };

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);

  var parser = new marked.Parser(options);

  return parser.parse(tokens).trim();
}

describe('links', function() {

  it('should handle too many blockquotes blocks', function() {
    var a = gitterMarkdown(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>hello punk");
    assert.strictEqual(a, '<blockquote>\n<p>hello punk</p>\n</blockquote>');
  });


});
