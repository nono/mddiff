var cmark = require("cmark");

exports.parseAST = function(markdown) {
  var reader = new cmark.DocParser();
  return reader.parse(markdown);
};
