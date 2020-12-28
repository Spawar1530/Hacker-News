var express = require("express");
var User = require("../models/user");
var passport = require("passport");//used to authenticate requests
var router = express.Router();

// =============
// auth Routes
// ============
router.get("/signup", function(req, res){
   res.render("signup");
});
//router to signup for a user
router.post("/signup", function(req, res){
   var newUser = new User({
      username: req.body.username,
      email: req.body.email,
   });
   //if else condition for verifying password of newly created user
   User.register(newUser, req.body.password, function(err, user){
      if(err){
         // console.log(err);
         req.flash("error", err.message);
         return res.redirect("signup");
      }else{
         passport.authenticate("local")(req, res, function(){
            res.redirect("/");
         });
      }
   });
});

//log-in page
router.get("/login", function(req, res){
   res.render("login");
});
router.post("/login", passport.authenticate("local", {
   successRedirect: "/",
   failureRedirect: "/login"
}),function(req, res){
});

//log out page
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});

//before signing in user needs to authenticate
router.isLoggedIn = function(req, res, next){
   if(req.isAuthenticated()){
      return next();
   }else{
      req.flash("error", "You need to be logged in to do that")
      res.redirect("/login");
   };
}; 


module.exports = router ;