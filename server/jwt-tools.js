/*=======================================================================
Function used in extracting JWT from header and extracting userId from it.

Ref.
http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files
========================================================================*/


var expressJwt = require('express-jwt'); 	//https://npmjs.org/package/express-jwt

module.exports = {


	getJwtFromHeader : function(reqHeaders) {

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
		Code taken from express-jwt source code
		A space separates Bearer and token
		=================================================================*/
	    if (reqHeaders && reqHeaders.authorization) {
	      var parts = reqHeaders.authorization.split(' ');
	      if (parts.length == 2) {
	        var scheme = parts[0]
	          , credentials = parts[1];
	          
	        if (/^Bearer$/i.test(scheme)) {
	          token = credentials;
	          //console.log("TOKEN= "+token);
	          return token;
	        }
	      }
	    }
	},

	cleanUserId : function(userId) {

		var userId = userId.slice(1,25);				//Remove " from each end to get valid 24char MongoDB objectId

		/*==========================================================
 		http://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id
 		 check to see if id is a valid ObjectId or not
 		===========================================================*/

 		if (userId.match(/^[0-9a-fA-F]{24}$/)) {
 		  return userId;
 		}
 		else {
 			console.log("Invalid ObjectId: " + userId);
 			return 0;
 		}
 	}

}