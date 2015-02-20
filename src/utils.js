const fs = require("fs");

exports.readStdinOrFile = function(filename) {
  return new Promise(function(resolve, reject) {

    if (filename === "-") {
      let chunks = [];
      process.stdin.setEncoding("utf8");
      process.stdin.on("readable", function() {
        const chunk = process.stdin.read();
        if (chunk !== null) {
          chunks.push(chunk);
        }
      });
      process.stdin.on("end", function() {
        resolve(chunks.join(""));
      });
    } else {
      fs.readFile(filename, { encoding: "utf8" }, function(err, data) {
        if (err) {
          return reject(`Error on reading ${ filename }: ${ err }`);
        }
        resolve(data);
      });
    }

  });
};
