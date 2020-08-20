
/**
 * @Route /users
 * @method get
 * 
 * @summary Get users
 * @description Get all users
 * 
 * @parameter in="header" name="user-id" required=true type="string"
 * @parameter in="body" name="RequestBodyModel" required=true schema={"$ref":"#/definitions/RequestBodyModel"}
 * 
 * @response 200
 *    @resDescription 200 response
 *    @resContent application/json schema={"$ref":"#/components/schema/User"} 
 *    @resHeaders Access-Control-Allow-Origin schema=type=string
 * 
 * @response 400
 *    @resDescription 400 response (bad request)
 * 
 */
module.exports.GetUser = async (event) => {
  //...
}