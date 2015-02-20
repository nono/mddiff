#!/usr/bin/env node
"use strict";
require("babel/register");

var mddiff = require("mddiff");
var argv = require("yargs")
             .usage("Usage: $0 [--dot] [--dark] [-f font] [-s fontsize] filename\n\tfilename can be - for stdin")
             .example("$0 README.md", "show the AST of the README")
             .demand(1)
             .boolean("dot")
             .boolean("dark")
             .alias("d", "dark")
             .argv;

var display = function(markdown, filename) {
  var out;
  var err, ast = mddiff.parseAST(markdown);
  if (err) {
    return console.error("Error on processing %s: %s", filename, err);
  }
  if (argv.dot || argv.d) {
    var options = {};
    if (argv.d) { options.palette = mddiff.palettes.solarizedDark; }
    if (argv.f) { options.fontname = argv.f; }
    if (argv.s) { options.fontsize = argv.s; }
    out = mddiff.exportDot(ast, filename, options);
  } else {
    out = JSON.stringify(ast, null, '  ');
  }
  console.log(out);
};

argv._.forEach(function (filename) {
  mddiff.readStdinOrFile(filename).then(function(result) {
    display(result, filename);
  }, function(err) {
    console.error(err);
  });
});
