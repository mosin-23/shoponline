import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Checkmark } from 'react-checkmark'

axios.defaults.baseURL = "https://ecom-qzh4.onrender.com";

const ListOrders = () => {
    const token = localStorage.getItem('authToken');
    const [orders, setOrders] = useState([]);

    const GetOrders = async () => {
        try {
            const resp = await axios.get(`/user/orders/${localStorage.getItem('id')}`, {
                headers: {
                    Authorization: token
                }
            });
            setOrders(resp.data);
        } catch (error) {
            console.error('Error Fetching Orders');
        }
    };

    useEffect(() => {
        GetOrders();
    }, []);

    // Function to get step number based on order status
    const getOrderStatusStep = (status) => {
        switch (status) {
            case "Paid":
                return 1;
            case "Transit":
                return 2;
            case "Delivered":
                return 3;
            default:
                return 0;
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
            <div className="w-full max-w-4xl">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={order.ordersitem.image}
                                    alt={order.ordersitem.title}
                                    className="w-24 h-24 rounded-md object-cover"
                                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold">{order.ordersitem.title}</h3>
                                    <p className="text-gray-600">Category: {order.ordersitem.category}</p>
                                    <p className="text-gray-600">Rating: {order.ordersitem.rating}</p>
                                    <p className="text-gray-900 font-bold">Price: ₹{order.ordersitem.price}</p>
                                </div>
                            </div>
                            <div className="mt-4 border-t pt-4">
                                <p className="text-gray-700">
                                    <span className="font-semibold">Order ID:</span> {order.order_id}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Order Date:</span> {new Date(order.order_date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Amount:</span> ₹{order.order_amount}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Payment ID:</span> {order.razorpay_payment_id}
                                </p>
                                <div className='flex flex-row justify-start'>
                                <p className="text-gray-700 font-bold mr-4">
                                    <span className="font-semibold">Payment Status:</span> {order.order_status}
                                </p>
                                <span><Checkmark size='20px' color='green' /></span>
                                </div>
                            </div>

                            {/* Stepper for order status */}
                            <div className="flex items-center justify-between mt-4">
                                {["Paid", "Transit", "Delivered"].map((step, index) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <div
                                            className={`w-6 h-6 rounded-full ${
                                                getOrderStatusStep(order.delivery_status) >= index + 1
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-300'
                                            }`}
                                        ></div>
                                        <span
                                            className={`text-sm mt-2 ${
                                                getOrderStatusStep(order.delivery_status) >= index + 1
                                                    ? 'text-blue-600'
                                                    : 'text-gray-400'
                                            }`}
                                        >
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default ListOrders;
