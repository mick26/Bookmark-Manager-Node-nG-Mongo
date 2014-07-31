/*================================================================
Ref.
Mongoose v3.8.12: https://github.com/LearnBoost/mongoose/wiki/3.8-Release-Notes

Mongoose Sub Doc's
https://coderwall.com/p/6v5rcw
http://stackoverflow.com/questions/9305987/nodejs-mongoose-which-approach-is-preferable-to-create-a-document

https://npmjs.org/package/express-jwt

Server side Routing using Express / Mongoose / MongoDB
=================================================================*/

var mongoose = require('mongoose');
//Mongoose version
console.log('Running mongoose version %s', mongoose.version);		

/*=================================================================
Express middleware to validate a JSON Web token
express-jwt which is a simple middleware that parses the Authorization header 
and validates the JWT using jsonwebtoken
https://groups.google.com/forum/#!topic/nodejs/WrEZ4xTm7wI
==================================================================*/
var expressJwt = require('express-jwt');

/* ========================================================== 
JSON Web Token Secret String
============================================================ */
var secret = require('./config/jwtSecret');

/* ========================================================== 
ROUTES
============================================================ */
var authRoutes = require('./routes/auth-routes.js');
var bookRoutes = require('./routes/book-routes.js');



module.exports = function(app) 
{

	/* ========================================================== 
	User Routes
	============================================================ */
	app.post('/register', authRoutes.register);
	app.post('/login', authRoutes.login);
	app.post('/logout', authRoutes.logout);
	app.get('/admin', authRoutes.getAdmin);

	/* ========================================================== 
	Bookmark Routes
	============================================================ */
	app.post('/bookmarks', expressJwt({secret:secret.JWTsecret}), bookRoutes.addBookmark);
	app.get('/bookmarks', expressJwt({secret:secret.JWTsecret}), bookRoutes.getBookmarks);
	app.delete('/bookmarks/:bookmark_id', expressJwt({secret:secret.JWTsecret}), bookRoutes.deleteBookmark);

	/* ========================================================== 
	Tag Routes
	============================================================ */
	app.post('/tags', expressJwt({secret:secret.JWTsecret}), bookRoutes.addTag);
	app.get('/tags', expressJwt({secret:secret.JWTsecret}), bookRoutes.getTags);
	app.delete('/tags/:tag_id', expressJwt({secret:secret.JWTsecret}), bookRoutes.deleteTag);


	//NOT IMPLEMENTED YET!!!!!!
	app.put('/tagFromBookmark/:bookmarkId',expressJwt({secret:secret.JWTsecret}), bookRoutes.deleteTagFromBookmark);

};