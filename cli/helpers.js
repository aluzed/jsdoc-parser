const infos = require('../package.json');

module.exports = [
  "",
  "Doc Parser Cli is a script that extract comments in any target file in a specified folder, then handle them the way you want by using a custom node.js script.",
  "",
  "Current Version : " + infos.version,
  "",
  "To use, type : doc-parser-cli [options...]",
  "",
  "Arguments : ",
  "============",
  "entry, -e       Folder to scan",
  "verbose, -v     Display log (optional)",
  "maxDepth        Limit sub folder depth (optional)",
  "include, -i     File pattern to include, default /\.js$/ (optional)",
  "exclude, -e     File pattern to exclude, default null (optional)",
  "handler, -h     Handler js file",
  "before          Script to execute before (optional)",
  "after           Script to execute after (optional)" 
];