#!/usr/bin/env node
"use strict";
require("babel/register");

var util = require("util");
var mddiff = require("mddiff");
var argv = require("yargs")
             .usage("Usage: $0 file.ast")
             .demand(1)
             .argv;

argv._.forEach(function (filename) {
  mddiff.readStdinOrFile(filename).then(function(result) {
    try {
      console.log(mddiff.toMarkdown(JSON.parse(result)));
    } catch(err) {
      console.error(err);
    }
  }, function(err) {
    console.error(err);
  });
});
