const express=require('express')
const router=express.Router();
const authController=require('../controller/auth.js')
router.post('/SignUp',authController.createUser)
router.post('/login',authController.login)
module.exports=router;