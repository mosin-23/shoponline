const express=require('express')
const User=require("../modal/userModal");
const products = require('../modal/productModal');
const addProduct=async(req,res)=>{
    try {
        const newproduct=await products.create(req.body);
        res.status(200).json(newproduct);
    } catch (error) {
        res.status(500).json({error});
    }
}
const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const newproduct=await products.findByIdAndDelete(id);
        res.status(200).json(newproduct);
    } catch (error) {
        res.send('error deleting product').status(400);
    }
}
const updateProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const newproduct=await products.findByIdAndUpdate(id,req.body,{new:true});
        if(!newproduct)
        {
            return res.status(500).send('cant find product');
        }
        res.status(200).json({message:"Product Updated"});
    } catch (error) {
        res.send('error updating product').status(400);

    }

}
const getProducts=async(req,res)=>{
    try {
        let query=products.find();
        if(req.query.sort){
        const spros=await query.sort({[req.query.sort]:req.query.order}).limit(parseInt(req.query.limit)).exec();
        res.status(200).json(spros);
        }
        else{
        const items=await query.exec();
        res.status(200).json(items);
        }
    } catch (error) {
        res.status(500).send('Cant get products');
    }
}
const getProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const getproduct=await products.findById(id);
        res.status(200).json(getproduct);
    } catch (error) {
        res.status(500).send('Cant get Product');
    }
}

const addtoCart = async (req, res) => {
    try {
        const { uid, pid } = req.body;
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const product = await products.findById(pid);
        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }
        if (user.cart.includes(pid)) {
            return res.status(400).json({ message: "Product is already in the cart" });
        }
        user.cart.push(pid);
        await user.save();
        res.status(200).json({ message: "Product successfully added to cart" });
    } catch (error) {
        res.status(500).json("Something went wrong!");
    }
}
const removeFromCart = async (req, res) => {
    try {
        const { uid, pid } = req.body;
        const user = await User.findById(uid);
        if (!user) return res.status(401).json({ message: "User not found" });
        const product = await products.findById(pid);
        if (!product) return res.status(400).json({ message: "Product not found" });
        const productIndex = user.cart.indexOf(pid);
        if (productIndex === -1) return res.status(400).json({ message: "Product not in cart" });
        user.cart.splice(productIndex, 1);
        await user.save();
        const updatedCart = await products.find({ _id: { $in: user.cart } });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json("Something went wrong!");
    }
}


module.exports={
    addProduct,deleteProduct,getProduct,getProducts,updateProduct,addtoCart,removeFromCart
}