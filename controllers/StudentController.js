//Requiring the student Schema
const { message } = require('prompt');
const Student=require('../models/student');
const { default: mongoose } = require('mongoose');

exports.AddStudentData=(req,res)=>{
    const {Name,email,age,course}=req.body;
    const Stud=new Student({
        Name,email,age,course
    })
    Stud.save().then((student)=>{
        console.log("The saved student object is  ",student)
        res.status(200).json(student)
    }).catch(err=>console.log("Error while saving a student ",err))
}
exports.StudentsDetail=(req,res)=>{
    Student.find().then((students)=>{
        res.status(200).json(students)
    }).catch(err=>console.log("Error while fetching student deatils ",err))
}
exports.StudentDetailById=async(req,res)=>{
    try{
        const id=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Provide the student id in correct Object ID Format "})
        }
        const student=await Student.findById(id);
        if(!student){
            return res.status(404).json({message:`Student with the ID ${id} not found`})
        }
        res.status(200).json(student);

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}
exports.UpdateStudent=(req,res)=>{
    const id=req.params.id
    const {Name,email,age,course}=req.body
    Student.findById(id).then((StudentFound)=>{
        if(StudentFound){
            StudentFound.Name=Name;
            StudentFound.email=email;
            StudentFound.age=age;
            StudentFound.course=course;
            return StudentFound.save()
        }
    }).then((results)=>{
        console.log("Student Found and Updated")
        res.status(200).json(results)
    }).catch((err)=>{
        res.status(404).json()
    })
}

exports.DeleteStudent=(req,res)=>{
    const id=req.params.id;
    Student.findByIdAndDelete(id).then((student)=>{
        if(!student){
            return res.status(404).json({message:"Student Not Found"})
        }
        console.log(`Student with id ${id} deleted succesfully `)
        return res.status(200).json(student)
    }).catch(err=>{
        res.status(500).json({error:err.message})
        console.log(`Error while deleting the student with ${id} the Error ${err}`)
    })
}
exports.FindByCourse=(req,res)=>{
    const {course}=req.query;
    if(!course){
        return res.status(400).json({message:"course quiery is required"})
    }
    Student.find({course:course}).then((students)=>{
        res.status(200).json(students)
    }).catch(err=>{
        res.status(500).json({error:err.message})
    })

}
//Page not found Handling

exports.PageNotFound=(req,res)=>{
    res.status(404).json({message:"The page you are looking for is not listed yet pls try again later !"})
}