/*================================================================
ROUTES - dealing with the bookmarks

Ref.
https://npmjs.org/package/node-jsonwebtoken
=================================================================*/

//To sign i.e. create the JWT
var jwt = require('jsonwebtoken');  		

var jwtTools = require('../config/jwt-tools');

var UserModel = require('../models/mongooseUserModel');	//Mongoose Model


/*================================================================
*** ROUTES ***
=================================================================*/
module.exports = {

	/*================================================================
	CREATE Bookmark - $http post
	create a Bookmark, information comes from AJAX request from Angular
	=================================================================*/
	addBookmark : function(req, res) {

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);

 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness

		/*================================================================
		Find user in MongoDB by _id and update
		When bookmark is created the user_data callback contains all the user info. 
		Extract users bookmark info and send to client.
		Ref
		http://mongoosejs.com/docs/documents.html
		=================================================================*/

		UserModel.findByIdAndUpdate(userId ,{$push : {bookmarks: {link : req.body.link, tags : req.body.tags}}}, function(err, user_data) {
			if (err) {
				res.send(err);
			}

			//Add new bookmark to DB
			else {
				user_data.save(function (err) {
					if (err) 
						console.log(err);
					res.send(user_data.bookmarks);
				});
			}
		});
	},



	/*================================================================
	READ Bookmarks - $http get
	=================================================================*/
	getBookmarks : function(req, res) {

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);
 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness

		/*================================================================
		Find user in MongoDB by _id
		The user_data callback contains all the user data. 
		Extract users bookmark info and send to client.
		=================================================================*/
		UserModel.findById(userId , function(err, user_data) {

			if (err)
				res.send(err);
			else {
				console.log("Useer Data= " + user_data);
				return res.json(user_data.bookmarks);				//In JSON
			}
		});
	},

	

	/*================================================================
	DELETE - $http delete
	=================================================================*/
	deleteBookmark : function(req, res) {
		//console.log("in app.delete() req.params.bookmark_id= " + req.params.bookmark_id);	//TEST **
		
		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);
 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness


		/*================================================================
		Find user in MongoDB by _id and update using $pull to delete bookmark
 		Extract users bookmark info and send to client.
		=================================================================*/
		UserModel.findByIdAndUpdate(userId ,{$pull : {bookmarks: {_id :req.params.bookmark_id }}}, 
					function(err, user_data) {
 			if (err) {
				console.log(err);
			}

			else {
				user_data.save(function (err) {
					if (err) 
						console.log(err);
					res.send(user_data.bookmarks);
				});
			}
		});
 	},


	/*================================================================
	CREATE Tag - $http post
	=================================================================*/
	addTag : function(req, res) {
		//console.info("req.body.name:"+JSON.stringify(req.body.name) )  	//TEST

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);
 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness

		/*================================================================
		Find user in MongoDB by _id and Update using $push to Add the Tag
		Extract users bookmark info and send to client.
		=================================================================*/
		UserModel.findByIdAndUpdate(userId ,{$push : {tags: {name : req.body.name,color : req.body.color}}}, function(err, user_data) {
			if (err) {
				res.send(err);
			}
			else {
				user_data.save(function (err) {
					if (err) 
						console.log(err);
					res.send(user_data.tags);
				});
			}
		});
	},


	/*================================================================
	READ Tags - $http get
	=================================================================*/
	getTags : function(req, res) {

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);
 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness


		/*================================================================
		Find user in MongoDB by _id
		Extract users Tag info and send to client.
		=================================================================*/
		UserModel.findById(userId , function(err, user_data) {

			if (err)
				res.send(err);
			else {
				console.log("Useer Data= " + user_data);
				return res.json(user_data.tags);				//In JSON
			}
		});
	},


	/*================================================================
	DELETE Tag - $http delete
	=================================================================*/
	deleteTag : function(req, res) {

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);
 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness


		/*================================================================
		Find user in MongoDB by _id and use $pull to delete tag
		Extract users Tag info and send to client.
		=================================================================*/
		UserModel.findByIdAndUpdate(userId ,{$pull : {tags: {_id : req.params.tag_id}}}, function(err, user_data) {
			if (err) {
				res.send(err);
			}
			else {
				user_data.save(function (err) {
					if (err) 
						console.log(err);
					res.send(user_data.tags);
				});
			}
		});
	},


	/*================================================================
	IGNORE  - Delete a Tag from a Bookmark
	****** NOTE!!! THIS FUNCTIONALITY NOT ADDED YET ******
	================================================================*/
	deleteTagFromBookmark : function(req, res) {

		console.log("req.params.bookmarkId = " + req.params.bookmarkId); //TEST **
		console.log("TagID req.body._id "+ req.body._id );

		/*================================================================
		Get the JWT from Authorization Header i.e. remove 'Bearer'
 		Code taken from express-jwt source code
 		A space separates Bearer and token
 		=================================================================*/
		var token = jwtTools.getJwtFromHeader(req.headers);

		/*================================================================
		get the decoded payload ignoring signature, no secretOrPrivateKey needed
		https://github.com/auth0/node-jsonwebtoken
 		=================================================================*/
 		var decoded = jwt.decode(token);
 		var userId = JSON.stringify(decoded.user_id);
		userId = jwtTools.cleanUserId(userId); 		//removes excess " from each end and checks for correctness
	}

}
