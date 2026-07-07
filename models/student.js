//requiring mongoose to create a schema
const mongoose=require('mongoose')

const StudentSchema=mongoose.Schema({
    Name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true},
    course:{type:String,required:true}},
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Students",StudentSchema);
