const CMark = require("commonmark");
const VNode = require("virtual-dom/vnode/vnode");
const VText = require("virtual-dom/vnode/vtext");

exports.parseAST = function(markdown) {
  const reader = new CMark.Parser();
  const parsed = reader.parse(markdown);
  const walker = parsed.walker();

  let stack = [];
  let event;
  while ((event = walker.next())) {
    const node = event.node;
    if (!event.entering) {
      // TODO props
      const children = stack.shift();
      const current = new VNode(node.type, {}, children);
      if (stack.length) {
        stack[0].push(current);
      } else {
        return current;
      }
    } else if (node.isContainer()) {
      stack.unshift([]);
    } else if (node.type === 'Text') {
      const text = new VText(node.literal);
      stack[0].push(text);
    } else if (node.type === 'CodeBlock') {
      let lines = node.literal.split('\n');
      lines.pop();
      lines = lines.map((line) => new VText(line + '\n'));
      const code = new VNode(node.type, {}, lines);
      stack[0].push(code);
    } else {
      // TODO props
      // TODO literal inside it
      const leaf = new VNode(node.type, {});
      stack[0].push(leaf);
    }
  }

  throw new Error("Oops, can't create AST. It shouldn't happen...");
};
