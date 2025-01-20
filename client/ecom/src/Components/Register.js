import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = 'https://ecom-qzh4.onrender.com';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [mobile, setmobile] = useState('');
    const [error, setError] = useState('');
    const [Address, setadd] = useState('');
    const [pincode, setpin] = useState('');
    const nav = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/Auth/SignUp', {
                name,
                email,
                password,
                mobile,
                Address,
                pincode
            });

            // Assuming success message is sent back
            setMessage('Registration successful! You can now log in.');
            setError('');
            setName('');
            setEmail('');
            setPassword('');
            setmobile('');
            setpin('');
            setadd('');
            nav('/');
        } catch (err) {
            setMessage('');
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
            <form onSubmit={handleRegister} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter unique mail ID"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                        required
                        placeholder="Enter Unique Number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Address</label>
                    <input
                        type="text"
                        value={Address}
                        onChange={(e) => setadd(e.target.value)}
                        required
                        placeholder="Enter Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">Pincode</label>
                    <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setpin(e.target.value)}
                        required
                        placeholder="Six digit pincode"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="At least 5 characters"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>

                {message && <p className="text-green-500">{message}</p>}
                {error && <p className="text-red-500 p-5 text-center text-3xl font-semibold">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
