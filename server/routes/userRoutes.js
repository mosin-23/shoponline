const express=require("express")
const router=express.Router();
const {getUser,getallUser,deleteUser,UpdateUser, getUserCart,getUserOrders}=require('../controller/userController')
router.get('/user/:id',getUser)
router.get('/user/cart/:id',getUserCart)
router.get('/users',getallUser)
router.get('/user/orders/:id',getUserOrders)
router.delete('/user/:id',deleteUser)
router.patch('/update/user/:id',UpdateUser)
module.exports=router;