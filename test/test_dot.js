require("babel/register");

var expect = require("chai").expect;
var mddiff = require("mddiff");

describe("Dot", function() {
  describe("#exportDot()", function() {
    var ast;

    beforeEach(function() {
      ast = {
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
    });

    it("constructs a dot representation from an AST", function() {
      var dot = mddiff.exportDot(ast, "test");
      expect(dot).to.contain('digraph "test"');
      expect(dot).to.contain('label="Document"');
      expect(dot).to.contain('label="Paragraph"');
      expect(dot).to.contain('label="\'bold\'"');
    });

    it("escapes double quotes", function() {
      ast.children[0].inline_content.push({ t: "Str", c: '"foo"' });
      var dot = mddiff.exportDot(ast, "test");
      expect(dot).to.contain('label="\'\\"foo\\"\'"');
    });

    it("escapes antislash", function() {
      ast.children[0].inline_content.push({ t: "Str", c: "foo\\" });
      var dot = mddiff.exportDot(ast, "test");
      expect(dot).to.contain('label="\'foo\\\\\'"');
    });
  });
});
