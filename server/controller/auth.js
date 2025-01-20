const jwt=require('jsonwebtoken')
const User=require('../modal/userModal')
const path=require('path')
const fs=require('fs')
const privateKey=process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
const bcrypt=require('bcrypt')
const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ 
            $or: [{ mobile: req.body.mobile }, { email: req.body.email }]
        });
        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.mobile === req.body.mobile 
                    ? "Mobile number already exists." 
                    : "Email already exists." 
            });
        }

        const hash = bcrypt.hashSync(req.body.password, 10);

        const user = new User({
            ...req.body,
            password: hash,
        });

        const savedUser = await user.save();

        const token = jwt.sign({ email: req.body.email }, privateKey, { algorithm: 'RS256' });
        savedUser.token = token;
        await savedUser.save();

        res.status(200).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred.", error });
    }
};

const login=async(req,res)=>{
    try {
        const doc=await User.findOne({email:req.body.email});
        if (!doc) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isAuth=bcrypt.compareSync(req.body.password,doc.password);
        if(isAuth)
        {
            var token=jwt.sign({email:req.body.email},privateKey,{algorithm:'RS256'});
            doc.token=token;
            await doc.save();
            const resp={name:doc.name,email:doc.email,token:doc.token,role:doc.role,id:doc.id}
            res.status(200).json(resp);
        }
        else{
            res.status(401).send('invalid password');
            console.log('invalid password')
        }
    } catch (error) {
        console.error('Token Verfication failed',error)
        res.status(400).json(error);
    }
}
module.exports={
    createUser,
    login
}