const http = require('http');

/**
 * Blablabla comment
 * blablabla here
 * blablabla line 3
 */
module.exports = {
  /**
   * @function listen
   * 
   * Start an http listen server
   * 
   * @param {number} port The port to listen to
   * 
   */
  listen: port => http.listen(port)
}