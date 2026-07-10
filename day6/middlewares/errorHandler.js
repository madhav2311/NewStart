exports.globalErrorHandler=(err,req,res,next)=>{
  console.error("Some error occured! ",err.message)
  const statusCode=err.statusCode||500
  return res.status(statusCode).json({success:false,status:statusCode,msg:err.message})
}