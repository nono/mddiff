require("babel/register");

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

    it("split lines of code inside a fenced code block", function() {
      var ast = mddiff.parseAST("```\none\ntwo\nthree\n```");
      var expected = {
        t: "Document",
        start_line: 1,
        start_column: 1,
        end_line: 3,
        children: [ {
          t: "FencedCode",
          start_line: 1,
          start_column: 1,
          end_line: 4,
          children: [],
          string_content: null,
          info: "",
          inline_content: [
            { t: "CodeLine", c: "one" },
            { t: "CodeLine", c: "two" },
            { t: "CodeLine", c: "three" },
          ]
        } ]
      };
      expect(ast).to.deep.equal(expected);
    });
  });
});
