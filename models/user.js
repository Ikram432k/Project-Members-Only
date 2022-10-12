const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type:String ,required:true ,maxLength:20},
    password:{type:String, required:true},
    member:{type:Boolean, default:false},
    admim:{type:Boolean, default:false},
});

module.exports = mongoose.model("User",userSchema);