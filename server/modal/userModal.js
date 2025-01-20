const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    email:{
        type:String,
        unique:true,
        validate:{
            validator: function (v)
            {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message:(props)=>`${props.value} is not a valid email`
        }
        ,required:true
    },
    password:{
        type:String,
        required:true,
        minLength:5
    },
    role:{
        type:String,
        default:"customer"
    },
    mobile: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid mobile number`
        },
        required: [true, "Mobile number is required"],
        unique:true
    },
    Address:{
        type:String,
        minLength:10
    },
    pincode:{
        type:Number,
        minLength:6
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }],
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }]
,
    token:String
})
const User=mongoose.model("user",userSchema)
module.exports=User;