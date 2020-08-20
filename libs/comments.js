const fs = require('fs');
const extract = require('extract-comments');

/**
 * @function ReadFile
 * 
 * Reads a file
 * 
 * @param {String} filePath file path 
 * 
 * @return {String} file content 
 */
const ReadFile = (filePath) => {
  if(!fs.existsSync(filePath)) throw new Error('Unable to resolve file : ' + filePath);
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * @function GetComments
 * 
 * Get comments in a file
 * 
 * @param {String} filePath file path
 * 
 * @return {Array} file comments 
 */
const GetComments = (filePath) => {
  const fileContent = ReadFile(filePath);
  let comments = extract(fileContent);
  return comments;
}

module.exports = GetComments;