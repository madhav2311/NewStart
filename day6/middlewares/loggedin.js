const session=require('../models/session')
exports.loggedin=(req,res,next)=>{
  if(!session.sess||!session){
    const error=new Error("User not logged in Please log in first !")
    error.statusCode=401
    throw error;
    return next(error)
  }
  next()
}
exports.validateAmount=(req,res,next)=>{
  const {amount}=req.body
  if(amount>0){
    return next()
  }
  const error=new Error("Enter a valid amount")
  error.statusCode=403
  throw error
  return next(error);
  
}

exports.validateRegestration=(req,res,next)=>{
  const{username,pass}=req.body;
  if(!username||!pass||username.trim===""||pass.trim===""){
    const error=new Error("Username and pass cannot be empty")
    error.statusCode=400
    return next(error)

  }
  if(pass.length<4){
    const error=new Error("Password must be greater than 3 characters")
    error.statusCode=400
    return next(error)

  }
  next()
}