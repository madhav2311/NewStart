const fs=require('fs')
const path=require('path')
const filepath=path.join(__dirname,'../models/accounts.json')

let account=[];
//read file
try{
  const rawdata=fs.readFileSync(filepath,'utf-8')
  account=JSON.parse(rawdata)
  console.log('Successfully loaded the accounts from disk to array !')
} 
catch(err){
  console.log('No Accounts found in the file ',err)
}


module.exports={account,filepath};