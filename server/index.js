const express=require("express")
require('dotenv').config()
const cors=require("cors");
const mongoose = require("mongoose");
const productRoutes=require('./routes/productRoutes')
const orderRoutes=require('./routes/orderRoutes');
const fs=require('fs')
const jwt=require('jsonwebtoken')
const path=require('path')
const publickey=fs.readFileSync(path.resolve(__dirname,'../public.key'))
const authRoute=require('./routes/auth')
const userRoute=require('./routes/userRoutes')
const queryRoute=require('./routes/QueryRoutes')
const app=express();
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

const auth=(req,res,next)=>{
    try {
      const token=req.get('Authorization').split('Bearer ')[1];
      var decoded=jwt.verify(token,publickey);
      if(decoded.email)
        {
            next();
        } 
      else{
        res.sendStatus(401);
      }
    } catch (error) {
        res.sendStatus(401);
    }
}

app.use('/Auth',authRoute)
app.use('/products',auth,productRoutes)
app.use('/',auth,userRoute)
app.use("/", productRoutes);
app.use('/payment', auth, orderRoutes);
app.use("/",queryRoute)
app.use((err, req, res, next) => {
  if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const value = err.keyValue[field];
      return res.status(400).json({ message: `Account Already exist with field '${field}': ${value}` });
  }
  next(err);
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT||8000,()=>{
        console.log('Running on port 8000')
    })
})
.catch((err)=>{console.log(err)});

