exports.toMarkdown = function(ast) {
  let buffer = "";
  let out = (s) => buffer += s;
  let tag = (node, before, after) => {
    out(before);
    for (let child of node.children) { walk(child); }
    out(after);
  };

  let walk = (node) => {
    switch (node.tagName) {
      case 'Document':
        tag(node, '', '');
      break;
      case 'HtmlBlock':
      case 'Paragraph':
      case 'List':
        tag(node, '', '\n\n');
        break;
      case 'Item':
        tag(node, '* ', '');
        break;
      case 'Header':
        tag(node, '# ', ' #\n\n');
        break;
      case 'Blockquote':
        tag(node, '> ', '\n\n');
        break;
      case 'CodeBlock':
        tag(node, '\n```\n', '\n```\n\n');
        break;
      case 'Html':
        out(node.literal);
        break;
      case 'Softbreak':
        out('\n');
        break;
      case 'Hardbreak':
        out('  \n');
        break;
      case 'Image':
        tag(node, `![`, `](${ node.href })`);
        break;
      case 'Link':
        tag(node, `[`, `](${ node.href })`);
        break;
      case 'Code':
        tag(node, '`', '`');
        break;
      case 'Emph':
        tag(node, '_', '_');
        break;
      case 'Strong':
        tag(node, '**', '**');
        break;
      case 'HorizontalRule':
        out('\n----\n');
        break;
      case undefined:
        out(node.text);
        break;
      default:
        throw new Error(`Unknown node in AST: ${ node.tagName }`);
    }
  };

  walk(ast);
  return buffer;
};
