const express=require('express')
const router=express.Router()
const SnippetController=require('../Controllers/SnippetController'
)
router.post('/',SnippetController.createSnippet)
router.get('/',SnippetController.getAllSnippet)
router.get('/:id',SnippetController.getSnippetById)

module.exports=router

