const session=require('../models/session')
exports.loggedin=(req,res,next)=>{
  if(session.sess.id){
    next()
  }
  return res.status(201).json({success:false,msg:'User Not logged In'})
}
exports.validateAmount=(req,res,next)=>{
  const {amount}=req.body
  if(amount>0){
    next()
  }
  return res.json({msg:'Please enter a valid amount'})
}