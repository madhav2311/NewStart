const {filepath}=require('../models/account')
const {account}=require('../models/account')
const session=require('../models/session');
const {saveToDisk}=require('../utils/db')
const Account=require('../models/accountSchema')

exports.createAccount=async(req,res,next)=>{
  try{
    const {username,pass}=req.body
    const existingUser=await Account.findOne({username})
    if(existingUser){
      const error=new Error('Username already exists pls try a different One')
      error.statusCode=403
      throw error
    }
    else{
      const newAccount=await Account.create({
        username:username,
        pass:pass
      })
      return res.status(200).json({success:true,message:'User created successfully ', id:newAccount._id,Username:newAccount.username})

    }
  


}
catch(error){
  return next(error)
}
}
exports.loggIn=async(req,res,next)=>{
  try{

    console.log("Current Accounts in memory:", account);
    console.log("Incoming Data from Client:", req.body);
    const{username,pass}=req.body;
    const found=await Account.findOne({username,pass})
    if(!found){
      const error=new Error('Username not found or invalid entry')
      error.statusCode=404
      throw error
    }
    else{

      session.sess=found;
      return res.status(200).json({success:true,msg:`${found.username} logged in successfully`})
    }
  }
  catch(error){
    next(error)
  }
}
exports.depositAmount=async(req,res,next)=>{
  try{

    const{username,amount}=req.body
    const transferAmount=Number(amount)
    const found=await Account.findOne({username})
    if(!found){
      const error=new Error("User not found")
      error.statusCode=403
      throw error
    }
    if(found){
      if(found.username===session.sess.username){
        await Account.updateOne({
          username:session.sess.username
        },{
          $inc:{balance:transferAmount}
        })
        session.sess.balance+=transferAmount
        
        return res.status(200).json({ success: true, msg: "Self-deposit successful", balance: session.sess.balance })
      }
      else{
        if(session.sess.balance<amount){
          const error=new Error("Not sufficient balance")
          error.statusCode=403
          throw error
        }
        if(session.sess.balance>=amount){ 
          await Account.updateOne({username:username},{$inc:{balance:transferAmount}})
          await Account.updateOne({username:session.sess.username},{$inc:{balance:-transferAmount}})
          session.sess.balance-=transferAmount
          return res.status(200).json({success:true,From:session.sess.username,To:found.username,balance:session.sess.balance})
        }
      }
    }
    
    return res.status(200).json({success:true,From:session.sess.username,To:found.username,balance:session.sess.balance})
  }
   catch(error){
        next(error)
      }

}
exports.checkBalance=(req,res)=>{
  return res.status(200).json({success:true,Profile:session.sess})
}
exports.logOut=(req,res)=>{
  if(session.sess){
  let {username}=session.sess
  session.sess=null
  return res.status(200).json({UsrName:username,msg:'Logged out successfully'})
  }
}

exports.knowAccounts=(req,res)=>{
  const{minBal,sortBy,page=1,limit=10}=req.query
  console.log("Raw Query Parameters Received:", req.query);
  console.log("Parsed values -> p:", Number(req.query.page), "l:", Number(req.query.limit));
  let results=[...account]
  //To list accounts which consists of atleast the specified minBalance
  if(minBal){
    results=results.filter(item=>item.balance>=Number(minBal))
  }
  //Sort the all accounts by highest balance
  if(sortBy==='balance'){
    results=results.sort((a,b)=>b.balance-a.balance)
  }
  //To show specified no of accounts per page
  const p=Number(page)
  const l=Number(limit)
  const StartIndex=(p-1)*l
  const endIndex=StartIndex+l
  results=results.slice(StartIndex,endIndex)

  return res.status(200).json({msg:'Here are the accounts',accounts:results})
}