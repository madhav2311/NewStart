//external module for sharing the original server
const express=require('express')
const StudentRouter=express.Router()
//local module of controller
const StudentController=require('../controllers/StudentController')
const { get } = require('prompt')

StudentRouter.post('/students',StudentController.AddStudentData)
StudentRouter.get('/students',StudentController.StudentsDetail)
StudentRouter.get('/students/search',StudentController.FindByCourse)
StudentRouter.get('/students/:id',StudentController.StudentDetailById)
StudentRouter.put('/students/:id',StudentController.UpdateStudent)
StudentRouter.get('/studentsdel/:id',StudentController.DeleteStudent)

module.exports.StudentRouter=StudentRouter;