const shapes = {
  document: "note",
  block: "box",
  inline: "oval",
};


const solarizedLight = {
  back: "#fdf6e3",
  fill: "#eee8d5",
  font: "#073642",
  strg: "#586e75",
  edge: "#002b36",
  code: "#268bd2",
};

const solarizedDark = {
  back: "#002b36",
  fill: "#073642",
  font: "#fdf6e3",
  strg: "#eee8d5",
  edge: "#93a1a1",
  code: "#2aa198",
};

exports.palettes = { solarizedLight, solarizedDark };


const defaults = {
  palette: solarizedLight,
  fontsize: 14,
  fontname: "Inconsolata",
};


exports.exportDot = function(ast, filename, options={}) {
  const pal  = options.palette  || defaults.palette;
  const size = options.fontsize || defaults.fontsize;
  const font = options.fontname || defaults.fontname;

  let out = [`digraph "${ filename }" {`,
             `graph [rankdir="LR", bgcolor="${ pal.back }"];`,
             `node [style="filled", fontcolor="${ pal.font }", fillcolor="${ pal.fill }", color="${ pal.edge }", fontsize=${ size }, fontname="${ font }"];`,
             `edge [color="${ pal.edge }"];`
            ];
  let n = 0;

  var builder = function(items, parent) {
    let ids = [];
    for (let item of items) {
      let id = n++;
      let children = [];
      let shape = shapes.inline;
      let label = item.tagName;
      let more = "";
      if (item.children) {
        children = builder(item.children, item.tagName);
        shape = shapes.block;
      }
      if (item.tagName === "Document") {
        shape = shapes.document;
      } else if (parent === "CodeBlock" || parent === "Code") {
        label = item.text;
        more = `, fontcolor="${ pal.code }"`;
      } else if (item.type === "VirtualText") {
        label = `'${ item.text }'`;
        more = `, fontcolor="${ pal.strg }"`;
      } else if (item.tagName === "Link" || item.tagName === "Image") {
        more = `, href="${ item.properties.href }"`;
      }
      label = label.replace(/["\\]/g, "\\$&");
      out.push(`  n${ id } [label="${ label }", shape="${ shape }"${ more }];`);
      for (let child of children) {
        out.push(`  n${ id } -> n${ child };`);
      }
      ids.push(id);
    }
    return ids;
  };

  builder([ast]);
  out.push('}');
  return out.join("\n");
};
