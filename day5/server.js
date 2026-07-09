const express= require('express')

const app=express()

app.use(express.json())
const port=3000
const {notfound}=require('./middlewares/notfound')
const {globalErrorHandler}=require('./middlewares/errorHandler')
const router=require('./routes/accountRouter')
app.use('/account',router)
app.use(notfound)
app.use(globalErrorHandler)
app.listen(port,()=>{
  console.log(`The server is running at http://localhost:${port}`)
})
