const express=require('express')
const router=express.Router();
const{CreateOrder,VerifyPayment,getOrders,getOrderById,cancelOrder, patchOrder, RemoveOrder,GetTotalRevenue}=require('../controller/OrderController')
router.post('/create',CreateOrder);
router.post('/verify',VerifyPayment);
router.get('/getOrders',getOrders);
router.get('/getOrder/:id',getOrderById);
router.get('/getRevenue',GetTotalRevenue);
router.patch('/order/:id',patchOrder)
router.delete('/deleteOrder/:id',RemoveOrder)
router.delete('/cancelOrder/:id',cancelOrder)
module.exports=router;
