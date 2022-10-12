const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const messageSchema = new Schema({
    user:{type: Schema.Types.ObjectId,ref:"User",required:true},
    title:{type:String,required:true,maxLength:100},
    text:{type:String,required:true,maxLength:500},
    timeStamp:{type: Date,default: Date.now,required:true}
});
messageSchema.virtual("date").get(()=>{
    return DateTime.fromJSDate(this.timeStamp).toFormat("yyyy-MM-dd, HH:mm");
});
module.exports = mongoose.model("Message",messageSchema);