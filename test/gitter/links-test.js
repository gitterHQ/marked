/* jshint node:true, unused:true */
/* global describe:false, it:false */
'use strict';

var assert = require('assert');
var marked = require('../..');

function getDefaultOptions() {
  return { gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };
}

function gitterMarkdown(text) {

  var options = {
    headerPrefix: 'test',
    gfm: true,
    tables: true,
    sanitize: true,
    breaks: true,
    linkify: true,
    skipComments: true
  };

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);


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
    assert.equal(gitterMarkdown('Already linked: [http://example.com/](http://example.com/).'),
      '<p>Already linked: <a href=\"http://example.com/\">http://example.com/</a>.</p>');
  });

  it('should deal with wikipedia links that contain brackets', function() {
    var text = 'Testing a link http://en.wikipedia.org/wiki/Order_(biology) should work';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var links = 0;
    var renderer = new marked.Renderer();

    renderer.link = function(href, title, text) {
      links++;
      assert.equal(href, 'http://en.wikipedia.org/wiki/Order_(biology)');
      assert.equal(text, 'http://en.wikipedia.org/wiki/Order_(biology)');
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    parser.parse(tokens);

    assert.equal(links, 1);
  });

  it('should exclude brackets from text that has links in it already', function() {
    var text = 'Please remember to visit my webpage (http://my-home-page.com)';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var links = 0;
    var renderer = new marked.Renderer();

    renderer.link = function(href, title, text) {
      links++;
      assert.equal(href, 'http://my-home-page.com');
      assert.equal(text, 'http://my-home-page.com');
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    parser.parse(tokens);

    assert.equal(links, 1);
  });

  it('should exclude brackets from text that has links in it already', function() {
    var text = 'Please remember to visit my webpage (http://my-home-page.com) http://en.wikipedia.org/wiki/Order_(biology)';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var links = 0;
    var renderer = new marked.Renderer();

    renderer.link = function(href, title, text) {
      if(links++ === 0) {
        assert.equal(href, 'http://my-home-page.com');
        assert.equal(text, 'http://my-home-page.com');
      } else {
        assert.equal(href, 'http://en.wikipedia.org/wiki/Order_(biology)');
        assert.equal(text, 'http://en.wikipedia.org/wiki/Order_(biology)');
      }

      return '<a href="' + href + '">' + text + '</a>';
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var html = parser.parse(tokens);

    assert.equal(links, 2);
    // assert.equal(html, '<p>Deal with <a href="#" data-link-type="issue" data-issue="123" class="issue">#123</a></p>\n');
  });

  it('should linkify text', function() {
    var parser = new marked.InlineLexer({}, {
      renderer: {
        text: function(text) {
          return "<" + text + ">";
        },
        link: function(href) {
          return "[" + href + "]";
        }
      }
    });

    assert.equal(parser.linkify('hello'), "<hello>");
    assert.equal(parser.linkify('.'), "<.>");
    assert.equal(parser.linkify('hello www.moo.com'), "<hello >[http://www.moo.com]");
    assert.equal(parser.linkify('hello www.moo.com https://blah.co'), "<hello >[http://www.moo.com]< >[https://blah.co]");
    assert.equal(parser.linkify('hello www.moo.com https://blah.co more'), "<hello >[http://www.moo.com]< >[https://blah.co]< more>");
  });

  it('should linkify naked urls correctly', function() {
    var text = 'Go to www.moo.com to get your www.businesscards.com ya ya ya';
    var options = getDefaultOptions();

    var lexer = new marked.Lexer(options);
    var links = 0;
    var textCount = 0;
    var renderer = new marked.Renderer();

    renderer.link = function(href/*, title, text*/) {
      links++;
      return "[" + href + "]";
    };

    renderer.text = function(text) {
      textCount++;
      return "<" + text + ">";
    };

    var tokens = lexer.lex(text);
    options.renderer = renderer;

    var parser = new marked.Parser(options);
    var output = parser.parse(tokens);

    assert.equal(links, 2);
    assert.equal(textCount, 3);
    assert.equal(output.trim(), "<p><Go to >[http://www.moo.com]< to get your >[http://www.businesscards.com]< ya ya ya></p>");
  });

  it('should render quoted naked links correctly', function() {
    var md = gitterMarkdown('Go to "github.com/example/two" okay');

    assert.equal('<p>Go to &quot;<a href="http://github.com/example/two&quot">github.com/example/two</a>&quot; okay</p>', md);

  });
});
