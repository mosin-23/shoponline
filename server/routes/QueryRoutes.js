const express=require('express')
const router=express.Router();
const {createQuery,getQuery}=require('../controller/QueryController')
router.post('/query',createQuery);
router.get('/query',getQuery);
module.exports=router;