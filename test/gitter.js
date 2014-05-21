
var marked = require('../');

function convert(text) {
  var options = { gfm: true, tables: true, sanitize: true, breaks: true, linkify: true };

  var renderer = new marked.Renderer();

  var lexer = new marked.Lexer(options);

  var tokens = lexer.lex(text);
  console.log(tokens);

  var parser = new marked.Parser(options, renderer);
  return parser.parse(tokens);
}


console.log(convert("#12312 #1232 #3123 @moo\n \n\nhttp://gitter.com/ www.google.com andrewn@datatribe.net"));
console.log(convert("```hello();```"));