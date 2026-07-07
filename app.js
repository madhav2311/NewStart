//creating a express app
const express=require('express')

//app we use in the routing , to deal with the server
const app=express()

//requiring dotenv to use env for dblink and port number , to allow change allower the project 
require('dotenv').config()

//requiring mongoose to connect with the data base
const mongoose=require('mongoose');

const { StudentRouter } = require('./routes/StudentRoutes');
const StudentController=require('./controllers/StudentController')

const port=process.env.PORT;

const MongoUrl=process.env.MONGO_URI;
mongoose.connect(MongoUrl).then(()=>{
    app.listen(port,()=>{
        console.log(`The server is running on http://localhost:${port}`)})
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(StudentRouter)
app.use(StudentController.PageNotFound)
const db=mongoose.connection;

//runs on error

db.on('error',err=>{
    console.error('MongoDb connection failed',err)
})
//runs on connection successful
db.once('open',()=>{
    console.log('Data base connected to ',db.host)
})