const fs = require('fs');

/**
 * File Lib
 * 
 * Line after a white line
 */
module.exports = {
  // Simple comment on one line

  /**
   * @function Read
   * 
   * Read a file
   * 
   * @param {String} path the path file to read
   * 
   * @return {Uint8Array} content
   */
  Read: (path) => fs.readFileSync(path),
  /**
   * @function Write
   * 
   * Write something into a file
   * 
   * @param {String} path path to write to
   * @param {String} content content to write
   * 
   */
  Write: (path, content) => fs.writeFileSync(path, content)
}