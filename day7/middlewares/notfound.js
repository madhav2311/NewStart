exports.notfound=(req,res)=>{
  return res.status(200).json({success:false,msg:'Page not found'})
}