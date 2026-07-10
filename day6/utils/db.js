const {filepath}=require('../models/account')
const fs=require('fs').promises

const saveToDisk=async(account)=>{
  try{
    await fs.writeFile(filepath,JSON.stringify(account,null,2),'utf-8')
    console.log('Written to the file successfully')
    return true

  }
  catch(err){
    consol.err('Didnt able to write array to file',err.message)
    return false
  }
}


module.exports={saveToDisk}