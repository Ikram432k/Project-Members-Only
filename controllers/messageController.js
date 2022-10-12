const Message = require('../models/message');

exports.index = async (req, res, next) => {
  try {
    // Populate message with "user" information (reference to user in model)
    const messages = await Message.find().sort([["timestamp", "descending"]]).populate("user");
    return res.render('index', { title: 'The JoJo Club', user: req.user, messages: messages });
  } catch (err) {
    return next(err);
  }
};
exports.create_message_get =(req,res)=>{
    res.send("not implemented");
}

exports.create_message_post =(req,res)=>{
    res.send("not implemented");
}

exports.delete_message_post =(req,res)=>{
    res.send("not implemented")
}
