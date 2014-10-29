#!/usr/bin/env node
'use strict';

var fs     = require('fs');
var mddiff = require('mddiff');

var display = function(markdown, filename) {
  var err, ast = mddiff.parseAST(markdown);
  if (err) {
    return console.error("Error on processing %s: %s", filename, err);
  }
  mddiff.display(ast);
}

process.argv.slice(2).forEach(function (filename) {
  if  (filename === "-") {
    var chunks = [];
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', function() {
      var chunk = process.stdin.read();
      if (chunk !== null) {
        chunks.push(chunk);
      }
    });
    process.stdin.on('end', function() {
      display(chunks.join(''), 'stdin');
    });
  } else {
    fs.readFile(filename, { encoding: 'utf8' }, function(err, data) {
      if (err) {
        return console.error("Error on reading %s: %s", filename, err);
      }
      display(data, filename);
    });
  }
});
