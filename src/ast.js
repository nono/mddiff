var cmark = require("commonmark");

exports.parseAST = function(markdown) {
  var transform = function(items) {
    for (let item of items) {
      if (item.children) {
        transform(item.children);
      }

      // Split lines of code for fenced code, to improve diffs
      if (item.t === "FencedCode") {
        item.inline_content = item.string_content.split("\n")
          .slice(0, -1)
          .map(l => ({ t: "CodeLine", c: l }));
        item.string_content = null;
      }
    }
  };

  let reader = new cmark.DocParser();
  let ast = reader.parse(markdown);
  transform([ast]);
  return ast;
};
