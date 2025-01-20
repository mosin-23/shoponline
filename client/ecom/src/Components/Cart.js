import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ConfirmDetails from './ConfirmDetails';
axios.defaults.baseURL='https://shoponline-e2qx.onrender.com'
const Cart = ({setlogged}) => {
    const[cart,setcart]=useState([]);
    const[cartprice,setcartprice]=useState(0);
    const uid=localStorage.getItem('id');
    const token=localStorage.getItem('authToken');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const HandleCart=async()=>{
        try {
            const resp=await axios.get(`/user/cart/${uid}`,{
                headers:{
                    Authorization:token
                }
            })
            setcart(resp.data);
        } catch (error) {
            console.error('Error Fetching Cart');
        }
    }

    const RemoveItemFromCart=async(productid)=>{
        try {
            const resp=await axios.post('/product/removeItem',{
                uid:localStorage.getItem('id'),
                pid:productid
            },{
                headers:{
                    Authorization:token
                }
            });
            setcart(resp.data);
        } catch (error) {
            console.error('Product not removed');
        }
    }
    const rmcart=()=>{
        toast("Item removed from cart!",{
            icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        });
    }
   
    const HandlePayment = async (_id, price,e) => {
        e.preventDefault();
        try {
            const resp = await axios.post('/payment/create', { amount: price, currency: 'INR' }, {
                headers: {
                    Authorization: token
                }
            });

            const options = {
                "key": "rzp_test_bAK6RXvYLVhUXi",
                amount: resp.data.order.order_amount,
                "currency": "INR",
                "name": "Mosin Dart",
                "description": "Product Purchase",
                "order_id": resp.data.order.order_id,
                "handler": function (response) {
                    Verifypayment(response,_id,localStorage.getItem('id'));
                },
                "prefill": {
                    "name": localStorage.getItem('name'),
                    "email":localStorage.getItem('email'),
                    "mobile":localStorage.getItem('mobile'),
                },
                theme: {
                "color": "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options); 
            rzp1.open();
        } catch (error) {
            console.log(error);
        }
    };
    

    const Verifypayment = async (response, pdid,userId) => {
        try {
            await axios.post('/payment/verify', {
                "order_id": response.razorpay_order_id,
                "razorpay_payment_id": response.razorpay_payment_id,
                "razorpay_signature": response.razorpay_signature,
                "ordersitem":pdid,
                "userId":userId
            }, {
                headers: {
                    Authorization: token
                }
            });
            toast.success("Payment successful!");
            openModal();
        } catch (error) {
            console.log('Payment verification failed:', error);
            toast.error("Payment verification failed.");
        }
    };


useEffect(()=>{
HandleCart();
},[])

useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setcartprice(total);
}, [cart]);
  return (
    <>
    <ConfirmDetails
  isOpen={isModalOpen}
  closeModal={closeModal}/>
    <h2 className='text-center mt-10 font-bold hover:font-extrabold cursor-default'>CART</h2>
    <div className="ml-5 mr-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center items-start">
  {cart.length > 0 ? (
    cart.map((each, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-between border border-gray-300 rounded-lg shadow-lg p-5 w-full max-w-xs bg-white"
      >
        <h1 className="font-serif text-lg font-semibold text-gray-700 mb-2">{each.category}</h1>
        <img
          src={each.image}
          alt={each.title}
          className="w-44 h-52 object-cover border border-gray-400 rounded-md mb-3"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
        <p className="text-gray-800 text-center font-medium mb-1">{each.title}</p>
        <p className="text-gray-600 text-center font-semibold mb-4">₹ {each.price}</p>
        <div className="flex flex-row justify-center items-center gap-3">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-xl"
            onClick={(e) => {
              HandlePayment(each._id, each.price, e);
            }}
          >
            ORDER NOW!
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600 hover:text-red-500 cursor-pointer transition-all"
            onClick={() => {
              RemoveItemFromCart(each._id);
              rmcart();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
            />
          </svg>
        </div>
      </div>
        ))):(
                <div className='flex items-center justify-center place-content-center'>
                    <div className='text-center'>
                    <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" className='w-4/6 ' alt="Empty Cart" />
                <p className='text-center text-bold'>Empty cart</p>
                </div>
                </div>
        )
      }
    </div>
    <h1 className='text-center text-3xl italic mt-5 mb-10'>Total Price:- ₹ <span className='text-red-500 font-bold'>{cartprice}</span></h1>
    <ToastContainer position='bottom-center' theme='light'/>
    </>
  )
}

export default Cart
