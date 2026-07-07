const express=require('express')

const router=express.Router(
)
const accountController=require('../controllers/accountController'
)
const log=require('../middlewares/loggedin')
router.get('/know',accountController.knowAccounts)

router.post('/create',accountController.createAccount)

router.post('/login',accountController.loggIn)

router.post('/deposit',log.loggedin,log.validateAmount,accountController.depositAmount)

router.get('/checkBalance',log.loggedin,accountController.checkBalance)

router.get('/logout',log.loggedin,accountController.logOut)


module.exports=router