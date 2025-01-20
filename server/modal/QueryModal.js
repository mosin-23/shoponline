const mongoose=require('mongoose')
const QuerySchema=mongoose.Schema({
    order_id:{
        type:String,
        required:true
    },
    product_id:{
        type:String,
        required:true
    },
    customerName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
      },
      contactNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Contact number must be a 10-digit number.']
      },
      dateOfOrder: {
        type: Date,
        required: true
      },
      issue: {
        type: String,
        required: true
      },
      descriptionOfIssue: {
        type: String,
        required: true
      }
    }, {
      timestamps: true 
});
const Query=mongoose.model('Query',QuerySchema)
module.exports=Query;