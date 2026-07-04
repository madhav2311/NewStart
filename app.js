const express=require('express')

const app=express()

const SnippetRouter=require('./Routers/SnippetRouter')
const notfound = require('./Middlewares/notfound')


require('dotenv').config
const port=3000
app.use(express.json())


app.use('/snippet',SnippetRouter)
app.use(notfound)


app.listen(port,()=>console.log(`The server is running at http://localhost:${port}`))
