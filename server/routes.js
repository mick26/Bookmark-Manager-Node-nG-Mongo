/*================================================================
Server side Routing using Express / Mongoose / MongoDB
=================================================================*/

//Get the Mongoose Models
var BookmarkModel = require('./models/mongooseBookmarkModel');
var TagModel = require('./models/mongooseTagModel');

module.exports = function(app) 
{

	/*================================================================
	CREATE Bookmark - $http post
	=================================================================*/
	app.post('/bookmarks', function(req, res) 
	{
		console.log("reg.headers"+ JSON.stringify(req.headers));
		console.info("req.body.link:"+JSON.stringify(req.body.link) )  	//TEST
		console.info("req.body.tags:"+JSON.stringify(req.body.tags) )	//TEST

		// create a Bookmark, information comes from AJAX request from Angular

		

		BookmarkModel.create(
		{
			link : req.body.link,
			tags : req.body.tags,
			bookmarks : req.body.bookmarks
		}, 

		function(err, bookmark) 
		{
			if (err)
				res.send(err);
			
			//send back all bookmarks after creation
			BookmarkModel.find(function(err, bookmarks) 
			{
				if (err)
				{
					return res.send(err);
				}
				else
				{	
					return res.json(bookmarks);
					console.log("bookmarks" + bookmarks);
				}
			});
		});

	});


	/*================================================================
	READ Bookmarks - $http get
	=================================================================*/
	app.get('/bookmarks', function(req, res) 
	{
		//use Mongoose to get all bookmarks in the database
		BookmarkModel.find(function(err, bookmarks) 
		{

			//if there is an error retrieving, send the error.
			if (err)
			{
				return res.send(err);		//nothing after res.send(err) will execute
			}
			else
			{
				return res.json(bookmarks); //return all bookmarks in JSON format
			}
		});
	});


	/*================================================================
		DELETE - $http delete
	=================================================================*/
	app.delete('/bookmarks/:bookmark_id', function(req, res) 
	{
		console.log("in app.delete() req.params.id= " + req.params.id);			//TEST **
		console.log("in app.delete() req.params.bookmark_id= " + req.params.bookmark_id);	//TEST **
		
		BookmarkModel.remove(
		{
			_id : req.params.bookmark_id
		}, 

		function(err, bookmarks) 
		{
			if (err)
				res.send(err);

			//get and return all the bookmarks after you delete one
			BookmarkModel.find(function(err, bookmarks) {
				if (err)
					res.send(err)
				res.json(bookmarks);
			});
		});
	});
	

	/*================================================================
	CREATE Tag - $http post
	=================================================================*/
	app.post('/tags', function(req, res) 
	{
		console.info("req.body.name:"+JSON.stringify(req.body.name) )  	//TEST
		console.info("req.body.color:"+JSON.stringify(req.body.color) )	//TEST

		// create a Bookmark, information comes from AJAX request from Angular
		TagModel.create(
		{
			name : req.body.name,
			color : req.body.color
		}, 

		function(err, tag) 
		{
			if (err)
				res.send(err);
			
			//send back all tags in JSON
			TagModel.find(function(err, tags) 
			{
				if (err)
				{
					return res.send(err);
				}
				else
				{
					return res.json(tags);
					console.log("Tags" + tags);
				}
			});
		});

	});

	/*================================================================
	READ Tags - $http get
	=================================================================*/
	app.get('/tags', function(req, res) 
	{
		// use mongoose to get all bookmarks in the database
		TagModel.find(function(err, tags) 
		{
			// if there is an error retrieving, send the error. 
			if (err)
			{
				return res.send(err);	//nothing after res.send(err) will execute
			}
			else
			{
				return res.json(tags); // return all bookmarks in JSON format
			}
		});
	});

	/*================================================================
	DELETE Tag - $http delete
	=================================================================*/
	app.delete('/tags/:tag_id', function(req, res) {

		TagModel.remove(
		{
			_id : req.params.tag_id
		}, 

		function(err, tag) 
		{
			if (err)
				res.send(err);

			//get and return all the tags after you delete one
			TagModel.find(function(err, tags) {
				if (err)
					res.send(err)
				res.json(tags);
			});
		});
	});


	/*================================================================
	Delete a Tag from a Bookmark
	================================================================*/
	app.put('/tagFromBookmark/:bookmarkId', function(req, res) {

		console.log("in app.delete() req.params.bookmarkId = " + req.params.bookmarkId); //TEST **

		//console.log("req.body: " + JSON.stringify(req.body));	//TEST

	   /* From the Mongoose Sub Document Docs http://mongoosejs.com/docs/subdocs.html
	    * I expected the following to work but id is undefined 
		*/ 
		//BookmarkModel.tags.id(req.body._id).remove();
		

		//Using Mongoose $pull to remove sub Document from DB
		var update = { $pull:{tags:{_id : req.body._id }}};

		//Query DB and Update		
		BookmarkModel.findByIdAndUpdate(req.params.bookmarkId ,update, function(err, bookmark) {

			if (err)
				res.send(err);

			BookmarkModel.find(function(err, bookmarks) 
			{
				if (err)
				{
					return res.send(err);
				}
				else
				{
					return res.json(bookmarks);
				}
			});	
		});

	});

};