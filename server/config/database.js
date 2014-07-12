
/*================================================================
To connect to MongoLab DB
Insert the details here:

var username = "";
var password = "";
var address = "@12345678.mongolab.com:55555/bookmarks";
=================================================================*/


module.exports = {

	/********************************************************************
	Specify MongoDB - database url
	*********************************************************************/
	//Mongo DB URI not using MongoLab API Key but username and password instead
	//	url : 'mongodb://' + username + ':' + password + address

	// *OR* If Local DB
	 url : 'mongodb://localhost/bookmarkMgr'
}