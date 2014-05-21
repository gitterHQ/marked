var assert = require('assert');
var marked = require('../..');

function gitterMarkdown(text) {

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);

  var options = {
    headerPrefix: 'test',
    gfm: true,
    tables: true,
    sanitize: true,
    breaks: true,
    linkify: true,
    skipComments: true
  };

  var parser = new marked.Parser(options);

  return parser.parse(tokens).trim();
}

describe('links', function() {

  it('should autolink hyperlinks with http', function() {
    assert.equal('<p><a href=\"http://gitter.com/\">http://gitter.com/</a></p>',
      gitterMarkdown("http://gitter.com/"));
  });

  it('should autolink hyperlinks with https', function() {
    assert.equal('<p><a href=\"https://gitter.com/\">https://gitter.com/</a></p>',
      gitterMarkdown("https://gitter.com/"));
  });

  it('should autolink urls without a protocol', function() {
    assert.equal('<p><a href=\"http://www.google.com\">www.google.com</a></p>',
      gitterMarkdown("www.google.com"));
  });

  it('should autolink email addresses', function() {
    assert.equal('<p><a href=\"mailto:andrewn@datatribe.net\">andrewn@datatribe.net</a></p>',
      gitterMarkdown("andrewn@datatribe.net"));
  });

  it('should handle normal links', function() {
    assert.equal('<p>Already linked: <a href=\"http://example.com/\">http://example.com/</a>.</p>',
      gitterMarkdown('Already linked: [http://example.com/](http://example.com/).'));
  });

});