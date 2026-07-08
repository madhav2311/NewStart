const {filepath}=require('../models/account')
const {account}=require('../models/account')
const session=require('../models/session');
const {saveToDisk}=require('../utils/db')
exports.createAccount=async(req,res)=>{
  const{username,pass}=req.body;
  const found=account.find(item=>item.username===username)
  if(found){
    return res.status(401).json({success:false,msg:'UserName exists pls use different one'})
  }
  const accountHolder={
    id:Date.now().toString(),
    username:username,
    pass:pass,
    balance:0,
  }
  account.push(accountHolder)
  await saveToDisk(account)
  return res.status(200).json({success:true,message:`User account created with username: ${accountHolder.username} and Id:${accountHolder.id}`,balance:accountHolder.balance})
}
exports.loggIn=async(req,res)=>{
  console.log("Current Accounts in memory:", account);
  console.log("Incoming Data from Client:", req.body);
  const{username,pass}=req.body;
  const found= account.find(item=>item.username===username && item.pass===pass)
  if(found){
    session.sess=found;
    return res.status(200).json({success:true,msg:`${found.username} logged in successfully`})
  }
  return res.status(404).json({success:false,msg:'Username not found or invalid entry'})
}
exports.depositAmount=async(req,res)=>{
  const{username,amount}=req.body
  const found=account.find(item=>item.username===username)
  if(found){
    if(found.username===session.sess.username){
      found.balance+=amount
    }
    else{
      if(session.sess.balance>=amount){
        found.balance+=amount
        session.sess.balance-=amount
        await saveToDisk(account)
      }
      else{
        return res.status(401).json({msg:'Not enough balance do the transaction ',balance:session.sess.balance})
      }
       
    }
    
    return res.status(200).json({success:true,From:session.sess.username,To:found.username,balance:session.sess.balance})
  }
   return res.status(404).json({success:false,msg:'Username not found or invalid entry'})

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