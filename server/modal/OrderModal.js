const mongoose=require('mongoose');

const OrderSchema=mongoose.Schema({
    order_id:{
        type:String,
        unique:true,
        required:true
    },
    razorpay_payment_id:{
        type:String,
    },
    razorpay_signature:{
        type:String,
    },
    order_date:{
        type: Date,
        default: Date.now
    },
    order_payment_status:{
        type:Boolean,
        required:true
    },
    order_status:{
        type:String,
        required:true,
        default:"Pending"
    },
    order_amount:{
        type:Number,
        required:true
    },
    delivery_status:{
        type:String,
        default:"Transit"
    },
    ordersitem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})
const Order=mongoose.model('Order',OrderSchema);
module.exports=Order;
