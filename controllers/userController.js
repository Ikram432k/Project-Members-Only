const User = require('../models/user');
const { body, validationResult } = require("express-validator");

exports.member_get =(req,res)=>{
    if (!res.locals.currentUser) {
        // User cannot access the members form unless logged in
        return res.redirect("/log-in");
      }
    res.render("makeMember",{user:res.locals.currentUser});
}

exports.member_post = [
    body("passcode").trim().isLength({min:1}).escape().withMessage("Title for your message is must"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty){
            return res.render("makeMember",{user:res.locals.currentUser,errors:errors.array()});
        }
        else if(req.body.passcode != process.env.members_passcode){
            return res.render("makeMember",{user:res.locals.currentUser,passcodeError:"wrong passcode"});
        }
        const user = new User(res.locals.currentUser);
        user.member = true;
        User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
            if (err) return next(err);
            return res.redirect("/member");
          });
    }
]

exports.admin_get = (req, res, next) => {
    if (!res.locals.currentUser) {
      // User cannot access the members form unless logged in
      return res.redirect("/log-in");
    }
    return res.render("makeAdmin", { title: "Become an Admin", user: res.locals.currentUser  });
  };

exports.admin_post =[
    body("passcode").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),
    
    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        // If there is an error submitting the member validation form, re-render the form with an error
        return res.render("admin_form", { title: "Become an Admin", user: res.locals.currentUser, errors: errors.array() });
      } else if (req.body.passcode != process.env.admin_passcode) {
        return res.render("admin_form", { title: "Become an Admin", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
      }
  
      const user = new User(res.locals.currentUser);
      user.admin = true;
  
      User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    },
  ];