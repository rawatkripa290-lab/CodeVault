const mongoose = require("mongoose")
const knowledgeSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  title:{
    type:String,
    required:true,
    trim:true
  },
  description:{
    type:String
  },
  type:{
    type:String,
    enum:["note","snippet","resource"],
    required:true
  },
  content:{
    type:String
  },
  language:{
    type:String
  },
  category:{
    type:String
  },
  tags:[{
    type:String
  }],
  url:{
    type:String
  }
},{timestamps:true})
const Knowledge = mongoose.model("Knowledge",knowledgeSchema)
module.exports = Knowledge