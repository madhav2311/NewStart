const mongoose=require('mongoose')

const accountSchema=mongoose.Schema({
  username:{
    type:String,
    required:[true,'Username is required'],
    unique:true,
    trime:true
  },
  pass:{
    type:String,
    required:[true,'Password is required'],
    length:4
  },
  balance:{
    type:Number,
    default:0
  }
},{timestamps:true})

module.exports=mongoose.model('Account',accountSchema)