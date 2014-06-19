/* ========================================================== 
Create Mongoose Schema and Model

Export Schema to make it available to Bookmark Schema 
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


var Schema = mongoose.Schema;		//Mongoose Schema

/* ========================================================== 
CREATE A MONGOOSE SCHEMA 
============================================================ */
var tagSchema = new Schema( {
	name : String,
	color : String
});
module.exports = tagSchema; 			//Export the tagSchema

//To add additional keys later, use the Schema#add method

/* ========================================================== 
CREATE A MONGOOSE MODEL - mongoose.model(modelName, schema)
============================================================ */
module.exports = mongoose.model('TagModel', tagSchema );


/* ========================================================== 
Open Mongoose Connection to DB
============================================================ */
//var db = mongoose.connection;
//db.on('error', console.error);