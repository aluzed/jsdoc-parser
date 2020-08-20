const path = require('path');
const fs = require('fs');

/**
 * @function RuleMatching
 * 
 * Check if a file path match with rule
 * 
 * @param {String} filePath 
 * @param {Array|RegExp} rule
 * 
 * @return {Boolean} true if matches rule, else otherwise 
 */
const RuleMatching = (filePath, rule) => {
  let match = false;
  if(rule instanceof Array) {
    for(let i in rule) {
      let r = rule[i];
      if(filePath.match(r)) match = true;
    }
  } else {
    match = filePath.match(rule);
  }
  return match;
}

/**
 * List any file we have to handle from the entry point
 * 
 * @param {String} entry Entry point
 * @param {Object} params Extra parameters { include: /rule/, exclude: /rule/ } 
 * @param {Number} maxDepth Max folder depth (default: 10)
 * 
 * @return {Array} file full path that matching our rules
 */
const GetFilePaths = (entry, params = {}, maxDepth = 10) => {
  if(!entry) throw new Error('Missing entry parameter');

  let exclude = params.exclude || null;
  let include = params.include || /\.js$/;
  let verbose = params.verbose || false;
  let filePaths = [];

  if(!fs.existsSync(entry)) {
    throw new Error('Error, unable to resolve entry');
  }

  if(!fs.lstatSync(entry).isDirectory()) {
    throw new Error('Error, entry must be a folder');
  }

  if(verbose) console.log('Scanning : ' + entry);

  let folderContent = fs.readdirSync(entry);

  for(let f in folderContent) {
    let _path = path.resolve(entry, folderContent[f]);

    // If sub folder and maxDepth > 0, reccursive call
    if(fs.lstatSync(_path).isDirectory() && maxDepth > 0) {
      if(verbose) console.log('Subfolder found : ' + _path);
      filePaths = filePaths.concat(GetFilePaths(_path, params, maxDepth - 1));
    }

    // If the current path is a file, check if we need to keep the path
    if(fs.lstatSync(_path).isFile()) {
      // Check if we need to include this file
      if(RuleMatching(_path, include)) {
        // Check if we need to exclude
        if(!exclude || !RuleMatching(_path, exclude)) {
          if(verbose) console.log('File found : ' + _path);
          filePaths.push(_path);
        }
      }
    }
  }

  if(verbose) console.log('Scan done.');
  return filePaths;
}

module.exports.GetFilePaths = GetFilePaths;