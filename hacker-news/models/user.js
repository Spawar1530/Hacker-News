var mongoose = require("mongoose");//Object oriented tool for async behaviour of code
var passportLocalMongoose = require("passport-local-mongoose");
//Passport-Local Mongoose is a Mongoose plugin that simplifies 
//building username and password login with Passport.
var assert = require('assert'); //To provide assertion functionality for verifying invariants

//User details schema
var userSchema = new mongoose.Schema({
   username: {type : String},
   password: {type : String},
   email: {type : String , unique: true},
   //History query for showing user's history based on his searches, as defined in history schema
   history: [
    {
      query: String,
      tag: {
          type: String,
          enum: ['story', 'comment'], 
       },
       by: {
           type: String,
           enum: ['date', 'popularity'], 
       },
       dateRange: {
           type: String,
           enum: ['all', 'last24h', 'pastWeek', 'pastMonth', 'pastYear'], 
       },
       time : { type : Date, default: Date.now }
   }
]

});
userSchema.plugin(passportLocalMongoose);
var User = mongoose.model("User", userSchema);
User.on('index', function(err) { // <-- Wait for User's indexes to finish
  assert.ifError(err);
//   User.create([{ email: 'Val' }, { email: 'Val' }], function(err) {
//     console.log(err);
//   });
});

// Promise based alternative. `init()` returns a promise that resolves
// when the indexes have finished building successfully. The `init()`
// function is idempotent, so don't worry about triggering an index rebuild.
module.exports = User;