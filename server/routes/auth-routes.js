/* ==========================================================
ROUTES - dealing with the user
ROUTE Definitions

Ref.
http://webapplog.com/intro-to-express-js-parameters-error-handling-and-other-middleware/
============================================================ */

/* ==========================================================
Modules/Packages Required
============================================================ */
//To sign i.e. create the JWT
var jwt = require('jsonwebtoken');  		//https://npmjs.org/package/node-jsonwebtoken
var jwtTools = require('../config/jwt-tools');

/* ========================================================== 
JSON Web Token Secret String
============================================================ */
var secret = require('../config/jwtSecret');

/* ========================================================== 
Mongoose Model
============================================================ */
var UserModel = require('../models/mongooseUserModel');


/* ========================================================== 
*** ROUTES ***
============================================================ */
module.exports = {

	/*================================================================
	$HTTP post /register
	=================================================================*/
	register : function(req, res) {

		var username = req.body.username || '';
		var password = req.body.password || '';
		var email = req.body.email || '';
		var passwordConfirmation = req.body.passwordConfirmation || '';


		//Angular validation also ensures required fields are filled
		//Check to ensure passwordConfirmation matches password
		if (username == '' || password == '' || password != passwordConfirmation) {
			res.status(400).send("Bad Request-password does not match passwordConfirmation").end();
		}


		else {
			//check if username exists already
			UserModel.findOne({username: req.body.username}, function (err, user) {
				
				if (err) {
					console.log(err);
					res.status(401).send("Unauthorised-error finding username in DB").end();
				}

				//user exists already
				else if(user) {
					res.status(409).send("Conflict: username already exists").end();
					//res.send(409, {status:409, message: 'Conflict - username already exists', type:'user-issue'});
				}

				//user does not exist already
				else if (user == undefined) {
				
					var newUser = new UserModel( {
						username : req.body.username,
						password : req.body.password,
						is_admin : true,
						email : req.body.email
					})

					newUser.save(function(err) {
						if (err) {
							console.log(err);
							res.status(500).send("Internal Server Error: problem saving user to DB").end();
						}
						else {
							return res.status(200).send("New user saved to DB ok").end();
						}
					});	
				}

			})
			
		};



	},


	/*================================================================
	$HTTP post /login
	=================================================================*/
	//app.post('/login', function (req, res) {

	login : function(req, res) {

		//validate req.body.username and req.body.password
	  	//if is invalid, return 401
	  	var username = req.body.username || '';
		var password = req.body.password || '';

		//Angular validation  check to ensure required fields are populated so this should not be called
		if (username == '' || password == '') { 
			return res.status(401).send("Either username of password fields are empty"); 
		}


		UserModel.findOne({username: req.body.username},function (err, user) {
			
			if (err) {
				console.log(err);
				return res.status(401).send("Error when trying to find user in DB");
			}

			if (user == undefined) {
				return res.status(401).send("user is undefined");
			}
			
			user.comparePassword(req.body.password, function(err, isMatch) {
				if (!isMatch) {					
					console.log("Attempt failed to login with " + user.username);
					return res.status(401).send("Password given does not match password in DB");
	            }

	           	var userProfile = {
	           		user_id : user._id,
					username: user.username,
					admin: user.is_admin,
					created: user.created,
					email: user.email
				};

				/*
				*Build the JWT - using jsonwebtoken.js method sign(payload, secretOrPrivateKey, options)
				*return type is a string
				*put users profile inside the JWT (payload)
				*Set token to expire in 60 min (option)
				*/
				var token = jwt.sign(userProfile, secret.JWTsecret, { expiresInMinutes: 60*1 });

				/*
				*Send the token as JSON to user
				*/
				res.json({ token: token });
			});
		});
	},


	/*================================================================
	$HTTP post /logout
	=================================================================*/
	//app.post('/logout', function(req, res) {

	logout : function(req, res) {
		res.status(200).send("Logged out ok");
	},
	

	/*================================================================
	NOT USED!!!!

	$http GET /admin - secured by JWT 
	JWT is TX by client in HTTP packet header, JWT is checked
	Express will return 401 and stop the route if token is not valid
	=================================================================*/
	//app.get('/admin', expressJwt({secret:secret.JWTsecret}) ,function (req, res) 	
/*
	getAdmin : function (req, res) {
	  console.log('user ' + req.username + ' is calling /admin');
	  console.info("req token=" +JSON.stringify(req.headers));
	  res.send(req.username);
	}
*/


}; /* @END/ module */

