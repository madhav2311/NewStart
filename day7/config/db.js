require('dotenv').config()
const mongoose=require('mongoose')
const Uri=process.env.Uri
const connDb=async()=>{
  try{
    const conn=await mongoose.connect(Uri)
    console.log(`📡 MongoDB Connected Successfully: ${conn.connection.host}`);

  }
  catch(error){
    console.log('The data base connection failed',error)
    proccess.exit(1)
  }
}
module.exports=connDb