var expect = require("chai").expect;
var mddiff = require("mddiff");
var VNode = require("virtual-dom/vnode/vnode");
var VText = require("virtual-dom/vnode/vtext");

describe("AST", function() {
  describe("#parseAST()", function() {
    it("constructs an AST from a markdown string", function() {
      var ast = mddiff.parseAST("**bold**");
      var expected = new VNode('Document', {}, [
        new VNode('Paragraph', {}, [
          new VNode('Strong',  {}, [
            new VText('bold')
          ])
        ])
      ]);
      expect(ast).to.deep.equal(expected);
    });

    it("splits lines of code inside a fenced code block", function() {
      var ast = mddiff.parseAST("```\none\ntwo\nthree\n```");
      var expected = new VNode('Document', {}, [
        new VNode('CodeBlock', {}, [
          new VText('one\n'),
          new VText('two\n'),
          new VText('three\n')
        ])
      ]);
      expect(ast).to.deep.equal(expected);
    });

    xit("can parse header with their levels");
    xit("can parse ordered lists");
    xit("can parse bullet lists");
    xit("can parse raw html");
    xit("figures what tight is for lists");
    xit("keeps start number for lists");
    xit("keeps delimiter for lists");
    xit("keeps destination for links and images");
    xit("keeps title for links and images");
    xit("keeps the info of fenced code block");
    xit("splits paragraphs in sentences");
  });
});
