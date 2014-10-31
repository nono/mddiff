require("6to5/register");

var expect = require("chai").expect;
var mddiff = require("mddiff");

describe("AST", function() {
  describe("#parseAST()", function() {
    it("constructs an AST from a markdown string", function() {
      var ast = mddiff.parseAST("**bold**");
      var expected = {
        t: "Document",
        start_line: 1,
        start_column: 1,
        end_line: 0,
        children: [ {
          t: "Paragraph",
          start_line: 1,
          start_column: 1,
          end_line: 0,
          children: [],
          inline_content: [ {
            t: "Strong",
            c: [ { t: "Str", c: "bold" } ]
          } ]
        } ]
      };
      expect(ast).to.deep.equal(expected);
    });
  });
});
