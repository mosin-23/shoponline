import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ConfirmDetails = ({ isOpen, closeModal }) => {
    const [Address, setAddress] = useState('');
    const [mobile, setPhone] = useState('');
    const [pincode, setpin] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/update/user/${localStorage.getItem('id')}`, { Address, mobile ,pincode },{
                headers:{
                    Authorization:localStorage.getItem('authToken')
                }
            });
            toast.success("Details updated successfully!");
            closeModal(); 
        } catch (error) {
            toast.error("Failed to update details.");
            console.log("Error updating details:", error);
        }
    };

    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            value={mobile}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Pincode</label>
                        <input
                            type="number"
                            value={pincode}
                            onChange={(e) => setpin(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                            min='6'
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 mr-2 text-gray-600 border rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfirmDetails;
