var cmark = require("commonmark");

exports.parseAST = function(markdown) {
  let reader = new cmark.Parser();
  let parsed = reader.parse(markdown);
  return parsed;
};
