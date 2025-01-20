import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import kali from './kali2.png'
axios.defaults.baseURL = 'https://shoponline-e2qx.onrender.com';

const LoginForm = ({ setlogged }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from submitting normally

        try {
            const response = await axios.post('/Auth/login', {
                email,
                password
            });

            // Extract token from response
            const { token, name, role, id, mobile } = response.data;
            // Store the Bearer token in localStorage
            localStorage.setItem('authToken', `Bearer ${token}`);
            localStorage.setItem('name', name);
            localStorage.setItem('role', role);
            localStorage.setItem('id', id);
            localStorage.setItem('mobile', mobile);
            localStorage.setItem('email', email);
            console.log('Login successful, Bearer token stored!');
            setlogged(true);
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    const handleRegister = () => {
        // Navigate to the registration page (you can define this route in your router setup)
        navigate('/register');
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                    LOGIN
                                </div>
                            </div>
                            <div className="mx-auto max-w-xs">
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Email"
                                />
                                <input
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Password"
                                />
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleLogin}
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-2">Sign In</span>
                                </button>
                                <button
                                    className="mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                    onClick={handleRegister}
                                >
                                    <span className="ml-2">Register New Account</span>
                                </button>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by KALI's
                                    <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a> and its
                                    <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-green-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${kali}) `,mixBlendMode: 'overlay'}}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
