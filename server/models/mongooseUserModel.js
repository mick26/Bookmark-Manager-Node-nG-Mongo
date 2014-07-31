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
var bcrypt = require('bcryptjs');       //Encryption package
var SALT_WORK_FACTOR = 10;              //Nos computation cycles with Encryption


/********************************************************************
Mongoose Schema - maps to a MongoDB collection
Defines the documents in the collection. 
http://mongoosejs.com/docs/guide.html
*********************************************************************/
var Schema = mongoose.Schema;			//Mongoose Schema

/* ========================================================== 
CREATE A MONGOOSE SCHEMA OBJECT
Ref. http://mongoosejs.com/docs/schematypes.html
============================================================ */

var userSchema = new Schema( {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  is_admin: { type: Boolean, required: true },
  created: { type: Date, default: Date.now },
  tags:[ {name : String, color : String } ],
  bookmarks:[{link : String, tags:[ {name : String, color : String } ]}]
} );

/*=================================================================
http://mongoosejs.com/docs/guide.html
When your application starts up, Mongoose automatically calls ensureIndex for each 
defined index in your schema. Index creation can cause a performance impact. 
Disable the behavior by setting the autoIndex option of your schema to false.
===================================================================*/
userSchema.set('autoIndex', false);

module.exports = userSchema; 			//Export the userSchema

//To add additional keys later, use the Schema#add method

/****************************************************************************
Bcryptjs
pre function runs before model is saved to DB. Needed because hash fn is
asynchronous and need to ensure clear text pw is never saved to DB.
Bcryptjs has the salt embeded into the hash. 
http://danielstudds.com/setting-up-passport-js-secure-spa-part-1/#note-204-3
*****************************************************************************/
userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) 
    	return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) 
        	return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) 
            	return next(err);
            user.password = hash;
            next();
        });
    });
});

/********************************************************************
Password verification
*********************************************************************/
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) 
        	return cb(err);

        cb(null, isMatch);
    });
};

/********************************************************************
In order to use Schema have to convert it to a Model
Create Mongoose Model - mongoose.model(modelName, schema)
Export Mongoose Model
*********************************************************************/
//UserModel = mongoose.model('User', userSchema);

/* ========================================================== 
CREATE A MONGOOSE MODEL - mongoose.model(modelName, schema)
============================================================ */

var UserModel = mongoose.model('UserModel', userSchema );

module.exports = UserModel;      //Export the userSchema

/* ========================================================== 
Open Mongoose Connection to DB
============================================================ */
//var db = mongoose.connection;
//db.on('error', console.error);