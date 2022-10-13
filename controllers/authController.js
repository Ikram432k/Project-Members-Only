const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
exports.userSign_in_get =(req,res)=>{
    res.render("sign-upForm");
}

exports.userSign_in_post =[
    body("username").trim().isLength({ min: 1 }).escape().withMessage("Username must be at least 6 characters."),
    body("password").trim().isLength({min:1}).escape().withMessage("password must be atleast 8 characters"),
    body("confirmPassword").trim().isLength({min:1}).escape().withMessage("password must be atleast 8 characters")
    .custom(async(value,{req})=>{
        if(value!==req) throw new Error("password must be same");
        return true;
    }),
    async(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.render("sign-upForm",{passwordConfirmationError:"Passwords must be same"});
        }
        try{
            const findUser = await User.find({username:req.body.username});
            if (findUser.length>0){
                return res.render("sign-upForm",{error:"User already exists"});
            }
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err){
                    return next(err);
                }
                const user = new User({
                    username: req.body.username,
                    password: hashedPassword,
                    member: false,
                    admim: false,
                }).save((err)=>{
                    if(err){
                        return next(err);
                    }
                    res.redirect("/")
                })
              });
        }
        catch(err){
            return next(err);
        }
    }
];
exports.userLogin_get =(req,res)=>{
    if (res.locals.currentUser) return res.redirect("/"); 
    res.render("loginForm",{title:"Login"})
}

exports.userLogin_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  });
exports.userLogout =(req, res, next)=>{
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }
