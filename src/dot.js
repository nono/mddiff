var shapes = {
  document: "note",
  block: "box",
  inline: "oval",
};


var solarizedLight = {
  back: "#fdf6e3",
  fill: "#eee8d5",
  font: "#073642",
  strg: "#586e75",
  edge: "#002b36",
  code: "#268bd2",
};

var solarizedDark = {
  back: "#002b36",
  fill: "#073642",
  font: "#fdf6e3",
  strg: "#eee8d5",
  edge: "#93a1a1",
  code: "#2aa198",
};

exports.palettes = { solarizedLight, solarizedDark };


var defaults = {
  palette: solarizedLight,
  fontsize: 14,
  fontname: "Inconsolata",
};


exports.exportDot = function(ast, filename, options={}) {
  let pal  = options.palette  || defaults.palette;
  let size = options.fontsize || defaults.fontsize;
  let font = options.fontname || defaults.fontname;

  let out = [`digraph "${ filename }" {`,
             `graph [rankdir="LR", bgcolor="${pal.back}"];`,
             `node [style="filled", fontcolor="${pal.font}", fillcolor="${ pal.fill }", color="${ pal.edge }", fontsize=${ size }, fontname="${ font }"];`,
             `edge [color="${ pal.edge }"];`
            ];
  let n = 0;

  var builder = function(items, type) {
    let ids = [];
    for (let item of items) {
      let id = n++;
      let children = [];
      if (item.children) {
        children = children.concat(builder(item.children, "block"));
      }
      if (item.inline_content) {
        children = children.concat(builder(item.inline_content, "inline"));
      }
      if (Array.isArray(item.c)) {
        children = children.concat(builder(item.c, "inline"));
      }
      if (Array.isArray(item.label)) {
        children = children.concat(builder(item.label, "inline"));
      }
      let shape = shapes[type];
      let label = item.t;
      let more = "";
      if (item.t === "Str") {
        label = `'${ item.c }'`;
        more = `, fontcolor="${ pal.strg }"`;
      } else if (item.t === "CodeLine" || item.t === "Code") {
        label = item.c;
        more = `, fontcolor="${ pal.code }"`;
      } else if (item.t === "Link") {
        more = `, href="${ item.destination }"`;
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

  builder([ast], "document");
  out.push('}');
  return out.join("\n");
};
