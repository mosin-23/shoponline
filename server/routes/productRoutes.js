const express=require('express')
const router=express.Router();
const {addProduct,deleteProduct,updateProduct,getProduct,getProducts, addtoCart, removeFromCart}=require('../controller/productController')
router.post('/addProduct',addProduct);
router.delete('/delete/:id',deleteProduct);
router.patch('/update/:id',updateProduct)
router.get('/getProducts',getProducts)
router.get('/product/:id',getProduct);
router.post('/product/addItem',addtoCart);
router.post('/product/removeItem',removeFromCart)
module.exports=router;
