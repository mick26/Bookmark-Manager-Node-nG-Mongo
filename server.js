/*=========================================================
Michael Cullen
server.js

2014
Working - (Tá se ag obair)

Ref.
http://stackoverflow.com/questions/14244767/trying-to-remove-a-subdocument-in-mongoose-gives-me-an-internal-mongoose-error
http://lodash.com/docs#remove
http://visionmedia.github.io/masteringnode/book.html
============================================================*/

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var express  = require('express');						//Express v4.7
var mongoose = require('mongoose'); 					//mongoose for mongodb
var logger   = require('morgan');						//logger middleware
var bodyParser = require('body-parser');				//middleware to read Http packet content using req.body etc
var path = require('path');								
var http = require('http');		
var colours = require('colors');						


/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var database = require('./server/config/database'); 	//database config - i.e. Local/remote MongoDB URL

var routes = require('./server/routes.js');				//Exchange routes & mongoose interaction with DB


/* ========================================================== 
Create a new application with Express
============================================================ */
var app = express(); 		

/* ========================================================== 
Port the server will listen on
============================================================ */
//var port = process.env.PORT || 3080; 					//set the port
app.set('port', process.env.PORT || 3080); 				//set the port


/********************************************************************
Run MongoDB in safe mode - wait for INSERT operations to succeed
important when altering passwords.
*********************************************************************/

/* ========================================================== 
Connect to mongoDB database - DB URL specified in database.js
============================================================ */
mongoose.connect(database.url, {safe:true}, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + database.url + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + database.url);
  }
});
	

/* ========================================================== 
serve the static index.html from the public folder
============================================================ */
app.use(express.static(__dirname + '/public')); 

/* ========================================================== 
Use Middleware
============================================================ */
app.use(logger('dev')); 	//log every request to the console in dev
app.use(bodyParser()); 		//Get info from $HTTP POST/PUT packets - needed for req.body


/* ========================================================== 
ROUTES - using Express
============================================================ */
routes(app);

/* ========================================================== 
Create HTTP Server using Express
============================================================ */
var server = http.createServer(app);


/* ========================================================== 
Start HTTP Server bind to port and Listen for connections
============================================================ */
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' .red + app.get('port')  ) ;
});

