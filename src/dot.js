exports.exportDot = function(ast, filename) {
  var out = [`digraph "${ filename }" {`, `graph [rankdir = "LR"];`];
  var n = 0;

  var builder = function(items) {
    var ids = [];
    for (let item of items) {
      let id = n++;
      let label = item.t === "Str" ? `'${ item.c }'` : item.t;
      out.push(`  n${ id } [label="${ label }"];`);
      let children = [];
      if (item.children) {
        children = children.concat(builder(item.children));
      }
      if (item.inline_content) {
        children = children.concat(builder(item.inline_content));
      }
      if (Array.isArray(item.c)) {
        children = children.concat(builder(item.c));
      }
      for (let child of children) {
        out.push(`  n${ id } -> n${ child };`)
      }
      ids.push(id);
    }
    return ids;
  };

  builder([ast]);
  out.push('}');
  return out.join("\n");
};
