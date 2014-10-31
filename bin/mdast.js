#!/usr/bin/env node
"use strict";
require("6to5/register");

var fs = require("fs");
var util = require("util");
var mddiff = require("mddiff");
var argv = require("yargs")
             .usage("Usage: $0 [--dot] [--dark] filename\n\tfilename can be - for stdin")
             .example("$0 README.md", "show the AST of the README")
             .demand(1)
             .boolean("dark")
             .boolean("dot")
             .argv;

var display = function(markdown, filename) {
  var out;
  var err, ast = mddiff.parseAST(markdown);
  if (err) {
    return console.error("Error on processing %s: %s", filename, err);
  }
  if (argv.dot) {
    var palette = argv.dark ? mddiff.palettes.solarizedDark : null;
    out = mddiff.exportDot(ast, filename, { palette: palette });
  } else {
    out = util.inspect(ast, { depth: null });
  }
  console.log(out);
};

argv._.forEach(function (filename) {
  if  (filename === "-") {
    var chunks = [];
    process.stdin.setEncoding("utf8");
    process.stdin.on("readable", function() {
      var chunk = process.stdin.read();
      if (chunk !== null) {
        chunks.push(chunk);
      }
    });
    process.stdin.on("end", function() {
      display(chunks.join(""), "stdin");
    });
  } else {
    fs.readFile(filename, { encoding: "utf8" }, function(err, data) {
      if (err) {
        return console.error("Error on reading %s: %s", filename, err);
      }
      display(data, filename);
    });
  }
});
