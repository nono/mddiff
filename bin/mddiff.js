#!/usr/bin/env node
"use strict";
require("babel/register");

var mddiff = require("mddiff");
var argv = require("yargs")
             .usage("Usage: $0 file1 file2\n\tone of the files can be - for stdin")
             .example("$0 file1.md file2.md", "show the differences between these 2 markdown files")
             .demand(2)
             .argv;

Promise.all(argv._.map(function(filename) {
  return mddiff.readStdinOrFile(filename);
})).then(function(results) {
  var left  = mddiff.parseAST(results[0]);
  var right = mddiff.parseAST(results[1]);
  var out = mddiff.diff(left, right);
  console.log(JSON.stringify(out, null, '  '));
}, function(err) {
  console.error(err);
});
