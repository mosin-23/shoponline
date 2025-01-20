const express=require("express");
const Razorpay=require('razorpay');
const crypto=require("crypto")
require('dotenv').config()
const Order=require('../modal/OrderModal');
const User=require('../modal/userModal')
const Product=require('../modal/productModal')
const razorpay=new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
});
const CreateOrder=async(req,res)=>{
    try {
        const{amount,currency="INR"}=req.body;
        const options={
            amount:amount*100,
            currency,
            receipt:crypto.randomBytes(10).toString('hex')
        }

    const RazorpayOrder=await razorpay.orders.create(options);
    const newOrder= await Order.create({
        order_id:RazorpayOrder.id,
        order_date:new Date(),
        order_payment_status:false,
        order_status:"Pending",
        order_amount:amount,
    })
    await newOrder.save();
    res.status(200).json({ RazorpayOrder, order: newOrder});
    } catch (error) {
        res.status(500).json({message:"error creating Payment"});
        console.log(error)
    }
}
const VerifyPayment=async(req,res)=>{
    try {
        const { order_id, razorpay_payment_id, razorpay_signature,userId,ordersitem } = req.body;
        const order = await Order.findOne({ order_id });
        if(!order){
            return res.status(400).json({message:"Order not found"});
        }
        const body=order_id+"|"+razorpay_payment_id;
        const expectedSignature=crypto.createHmac("sha256",process.env.KEY_SECRET).update(body.toString()).digest("hex");
        const isLegit=expectedSignature===razorpay_signature;
        if(isLegit){
            order.order_payment_status=true;
            order.order_status="Paid";
            order.razorpay_payment_id=razorpay_payment_id;
            order.razorpay_signature=razorpay_signature
            order.userId=userId
            order.ordersitem=ordersitem
            await order.save();
            const user = await User.findById(userId);
            if (user) {
                user.orders.push(order._id);
                await user.save();
            }
            const product=await Product.findById(ordersitem);
            if(product && product.quantity>0){
                product.quantity-=1;
                await product.save();
            }
            else {
                return res.status(400).json({ message: `Product with ID ${ordersitem.productId} is out of stock` });
            }
            res.status(200).json({ message: "Payment verified successfully", order });
        }
        else {
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ error});

    }
}
const patchOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const order = await Order.findByIdAndUpdate(id, updates, { new: true });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated successfully", order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Error updating order", error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({order_date:-1});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Error fetching orders" });
    }
};
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('ordersitem').populate('userId');
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: "Error fetching order" });
    }
};
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id, { order_status: "Cancelled" }, { new: true });
        res.status(200).json({ message: "Order cancelled successfully", order });
    } catch (error) {
        res.status(500).json({ error: "Error cancelling order" });
    }
};
const RemoveOrder=async(req,res)=>{
    try {
        const {id}=req.params;
        const order=await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
          }
        res.status(200).json({message:"Order Deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting the order", error: error.message });
    }
}
const GetTotalRevenue = async (req, res) => {
    try {
        const result = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$order_amount" }, // Summing up the 'amount' field
                    totalOrders:{$sum:1}
                },
            },
        ]);

        if (!result || !result.length) {
            return res.status(404).json({ message: "No revenue data found" });
        }

        res.status(200).json({ totalRevenue: result[0].totalRevenue, totalOrders:result[0].totalOrders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching total revenue", error: error.message });
    }
};


module.exports = {
    CreateOrder,
    VerifyPayment,
    getOrders,
    getOrderById,
    cancelOrder,
    patchOrder,
    RemoveOrder,
    GetTotalRevenue 

};