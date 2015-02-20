var expect = require("chai").expect;
var mddiff = require("mddiff");
var VNode = require("virtual-dom/vnode/vnode");
var VText = require("virtual-dom/vnode/vtext");

describe("Dot", function() {
  describe("#exportDot()", function() {
    var ast;

    beforeEach(function() {
      ast = new VNode('Document', {}, [
        new VNode('Paragraph', {}, [
          new VNode('Strong',  {}, [
            new VText('bold')
          ])
        ])
      ]);
    });

    it("constructs a dot representation from an AST", function() {
      var dot = mddiff.exportDot(ast, "test");
      expect(dot).to.contain('digraph "test"');
      expect(dot).to.contain('label="Document"');
      expect(dot).to.contain('label="Paragraph"');
      expect(dot).to.contain('label="\'bold\'"');
    });

    it("escapes double quotes", function() {
      ast.children[0].children.push(new VText('"foo"'));
      var dot = mddiff.exportDot(ast, "test");
      expect(dot).to.contain('label="\'\\"foo\\"\'"');
    });

    it("escapes antislash", function() {
      ast.children[0].children.push(new VText('foo\\'));
      var dot = mddiff.exportDot(ast, "test");
      expect(dot).to.contain('label="\'foo\\\\\'"');
    });
  });
});
