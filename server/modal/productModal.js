const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'title required']
    },
    image:{
        type:String
    },
    rating:{
        type:Number,
        default:0,
        required:[true,],
        min:[0,'min rating is 0'],
        max:[5,'5 is max rating']
    },
    quantity:{
        type:Number,
        required:[true,'min 1 quantity']
    },
    category:{
        type:String
    },
    price:{
        min:[1,"price should not be negative"],
        required:true,
        type:Number,
        default:1
    },
    description:{
        type:String
    }
})
const products=mongoose.model('products',productSchema);
module.exports=products;