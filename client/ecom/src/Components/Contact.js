import React, { useState } from 'react';
import axios from 'axios'
axios.defaults.baseURL='https://ecom-qzh4.onrender.com'
const OrderDetailsForm = () => {
    const [orderDetails, setOrderDetails] = useState({
        order_id: '',
        product_id: '',
        customerName: '',
        email: '',
        contactNumber: '',
        dateOfOrder: '',
        issue: '',
        descriptionOfIssue: ''
    });

    const handleChange = (e) => {
        setOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const resp=await axios.post('/query',orderDetails,{
                headers:{
                    Authorization:localStorage.getItem('authToken')
                }
            })
            alert('Response submitted will reach you out shortly.')
        } catch (error) {
            alert('Failed to submit the query try after sometime!')
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen mt-2 w-auto">
            <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                <h1 className="text-3xl text-center font-semibold text-indigo-600 mb-6">Order Query Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="orderNumber" className="block text-gray-700 font-medium mb-2">Order Number</label>
                        <input
                            type="text"
                            id="orderNumber"
                            name="order_id"
                            value={orderDetails.order_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productId" className="block text-gray-700 font-medium mb-2">Product ID</label>
                        <input
                            type="text"
                            id="productId"
                            name="product_id"
                            value={orderDetails.product_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customerName" className="block text-gray-700 font-medium mb-2">Customer Name</label>
                        <input
                            type="text"
                            id="customerName"
                            name="customerName"
                            value={orderDetails.customerName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={orderDetails.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Contact Number</label>
                        <input
                            type="tel"
                            id="contactNumber"
                            name="contactNumber"
                            value={orderDetails.contactNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date of Order</label>
                        <input
                            type="date"
                            id="date"
                            name="dateOfOrder"
                            value={orderDetails.dateOfOrder}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                            minLength='2022'maxLength='2024'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="issue" className="block text-gray-700 font-medium mb-2">Issue</label>
                        <select
    id="issue"
    name="issue"
    value={orderDetails.issue}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
>
    <option value="" disabled>
        Select an issue
    </option>
    <option value="refund">Refund</option>
    <option value="replacement">Replacement</option>
    <option value="damagedProduct">Damaged Product</option>
    <option value="wrongItem">Wrong Item Received</option>
    <option value="other">Other</option>
</select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description of Issue</label>
                        <textarea
                            id="description"
                            name="descriptionOfIssue"
                            value={orderDetails.descriptionOfIssue}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            maxLength="300"
                            placeholder="Provide a detailed description of the issue or complaint here..."
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderDetailsForm;
