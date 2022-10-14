const { body, validationResult } = require("express-validator");
const Message = require('../models/message');

exports.index = async (req, res, next) => {
  try {
    // Populate message with "user" information (reference to user in model)
    const messages = await Message.find().sort([["timestamp", "descending"]]).populate("user");
    return res.render('index', { title: 'Members Only', user: req.user, messages: messages });
  } catch (err) {
    return next(err);
  }
};
exports.create_message_get =(req,res)=>{
  if (!res.locals.currentUser) return res.redirect("/"); 
  res.render("newMessage",{user:res.locals.currentUser});
}

exports.create_message_post =[
  body("title").trim().isLength({min:1}).escape().withMessage("Title for your message is must"),
  body("text").trim().isLength({min:1}).escape().withMessage("Message must not be empty"),
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
      return res.render("newMessage",{errors:errors});
    }
    const message = new Message({
      user:req.user.id,
      title:req.body.title,
      text:req.body.text,
      timeStamp:Date.now()
    });
    message.save((err)=>{
      if(err) return next(err);
      res.redirect("/");
    });
  }
]

exports.delete_message_post =(req,res,next)=>{
  Message.findByIdAndRemove(req.body.messageId,(err)=> {
    if (err) return next(err);
    res.redirect("/");
  });
}
