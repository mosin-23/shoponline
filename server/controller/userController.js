const User=require('../modal/userModal')
const Order=require('../modal/OrderModal')
const getallUser=async(req,res)=>{
    try {
        const users=await User.find();
        res.status(200).json(users)
        
    } catch (error) {
        res.status(400).json(error)
    }
}
const getUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        res.status(200).json(user);
        } catch (error) {
        res.status(400).json(error)  
    }
}
const getUserCart=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findById(id).populate('cart');
        const sortedCart = user.cart.reverse();
        res.status(200).json(sortedCart);
        } catch (error) {
        res.status(400).json(error)  
    }
}
const getUserOrders = async (req, res) => {
    try {
        const { id } = req.params; // User ID

        // Find orders by userId and populate the ordersitem field
        const orders = await Order.find({ userId: id }).populate('ordersitem').sort({ order_date: -1 });;

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
};


const UpdateUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findOneAndUpdate({_id:id},req.body,{new:true});
        res.status(200).json(user);
        
    } catch (error) {
        res.status(400).json(error)
        
    }
}
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.findByIdAndDelete(id);
        if(!user)res.status(400).json({message:"User not found!"});
        const users=await User.find();
       res.status(200).json(users);
        
    } catch (error) {
        res.status(400).json(error)
        
    }
}


module.exports={
    getallUser,
    getUser,
    UpdateUser,
    deleteUser,
    getUserCart,
    getUserOrders
}