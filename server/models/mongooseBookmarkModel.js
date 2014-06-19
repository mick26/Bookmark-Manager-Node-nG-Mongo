/* ========================================================== 
Create Mongoose Schema and Model
Export Model to make it available in other files
Ref.
http://mongoosejs.com/docs/guide.html
http://mongoosejs.com/docs/subdocs.html
http://mongoosejs.com/docs/schematypes.html
============================================================ */

/* ========================================================== 
External Modules/Packages Required
============================================================ */
var mongoose = require('mongoose');


var Schema = mongoose.Schema;	//Everything in Mongoose starts with a Schema

/* ========================================================== 
Import the tagSchema
It's the Mongoose Schema for our 'tags' Sub Document
============================================================ */
var tagSchema = require('./mongooseTagModel').tagSchema;

/* ========================================================== 
Import the tagSchema
It's the Mongoose Schema for our 'tags' Sub Document
============================================================ */
//var userSchema = require('./mongooseUserModel').userSchema;


/* ========================================================== 
CREATE A MONGOOSE SCHEMA 
============================================================ */

var bookmarkSchema = new Schema( {
//	user_id: { type: Schema.ObjectId, ref: 'userSchema', required: true },
	link : String,
	tags:[tagSchema]
});

module.exports = bookmarkSchema;		//Export the bookmarkSchema

//To add additional keys later, use the Schema#add method

/* ========================================================== 
CREATE A MONGOOSE MODEL - mongoose.model(modelName, schema)
============================================================ */
module.exports = mongoose.model('BookmarkModel', bookmarkSchema );

/* ========================================================== 
Open Mongoose Connection to DB
============================================================ */
var db = mongoose.connection;
db.on('error', console.error);
