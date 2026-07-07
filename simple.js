const express=require('express')
const app=express()
//a variable to hold value of count

let count=0;

// to handle incoming data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/count',(req,res)=>{
  return res.status(200).json({success:true,CountValue:count})
})

app.post('/count/increment',(req,res)=>{
  return res.status(200).json({success:true,CountValueBefore:count,CountValueAfter:++count})
})

app.post('/count/reset',(req,res)=>{
  return res.status(200).json({success:true,CountValueBefore:count,CountValueResetted:count=0})
})

app.use((req,res)=>{
  return res.status(404).json({msg:'Page not found use /count'})
})

app.listen(3000,()=>{
  console.log(`The server is running at http://localhost:3000`)
})
