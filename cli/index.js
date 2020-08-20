const path = require('path');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const { GetFilePaths } = require('../libs/crawl');
const GetComments = require('../libs/comments');
const helpers = require('./helpers');

(async () => {

  try {
    let maxDepth = argv['max-depth'] || 10;
    let verbose = argv.v || argv.verbose || false;
    let include = argv.i || argv.include || null;
    let exclude = argv.e || argv.exclude || null;
    let handlerPath = argv.handler || null;
    let before = argv.before || null;
    let after = argv.after || null;
    
    if(!argv.entry) throw new Error('Error, missing --entry arg');
    
    const CFG_NAME = '.doc-parser.config.json';
    const workingDir = process.cwd();
    const configFile = path.resolve(workingDir, CFG_NAME);
    
    let currentConfig = {};
    
    // Handle custom config file here
    if(fs.existsSync(configFile)) {
      let customCFG = require(configFile);  
      if(customCFG.include) currentConfig.include = customCFG.include;
      if(customCFG.exclude) currentConfig.exclude = customCFG.exclude;
      if(customCFG.maxDepth && !argv.maxDepth) maxDepth = customCFG.maxDepth;
    
      // If no handler in cmd args
      if(!handlerPath) {
        // No handler at all ! throw error
        if(!customCFG.handler) {
          throw new Error('Missing --handler arg or "handler" key in config file');
        } else {
          handlerPath = customCFG.handler;
        }
      }
    } else {
      if(include) currentConfig.include = include;
      if(exclude) currentConfig.exclude = exclude;
      if(verbose) currentConfig.verbose = verbose;
      if(!handlerPath) throw new Error('Missing --handler arg or "handler" key in config file');
    }
    
    const HandleComments = require(path.resolve(workingDir, handlerPath));
    
    const entryPoint = path.resolve(workingDir, argv.entry);
    
    console.log('working dir', workingDir);
    
    // List the files
    const filePaths = GetFilePaths(entryPoint, currentConfig, maxDepth);
    
    // Script before if exists
    if(before) {
      let beforePath = path.resolve(workingDir, before);
      await require(beforePath)(filePaths);
    }
    
    // For each file, get comments
    for(let i in filePaths) {
      let file = filePaths[i];
      let comments = GetComments(file);
    
      // Then handle the comments
      await HandleComments(file, comments);
    }
    
    // Script after, if exists
    if(after) {
      let afterPath = path.resolve(workingDir, after);
      await require(afterPath)(filePaths)
    }
  } catch (e) {
    console.error(e);
    console.log(helpers.join("\n"));
  }

})()