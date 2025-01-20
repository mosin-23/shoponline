import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://ecom-qzh4.onrender.com';

const QueryList = ({ setlogged }) => {
    const token = localStorage.getItem('authToken');
    const [queries, setQueries] = useState([]);

    const getQueries = async () => {
        try {
            const resp = await axios.get('/query', {
                headers: {
                    Authorization: token,
                },
            });
            setQueries(resp.data);
        } catch (error) {
            console.error('Error fetching queries:', error);
        }
    };

    const deleteQuery = async (id) => {
        try {
            await axios.delete(`/query/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            setQueries(queries.filter((query) => query._id !== id));
            toast.success('Query deleted successfully!');
        } catch (error) {
            console.error('Error deleting a query:', error);
            toast.error('Failed to delete the query!');
        }
    };

    useEffect(() => {
        getQueries();
    }, []);

    return (
        <>
            <div className="flex flex-col m-5 items-center justify-center">
                <table className="table-auto w-full max-w-4xl shadow-lg cursor-pointer rounded-lg border border-2 border-black border-r-2">
                    <thead className="bg-slate-600 text-white">
                        <tr className="text-center">
                            <th className="px-6 py-3">ORDER ID</th>
                            <th className="px-6 py-3">PRODUCT ID</th>
                            <th className="px-6 py-3">Query ID</th>
                            <th className="px-6 py-3">Customer Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Contact Number</th>
                            <th className="px-6 py-3">Issue</th>
                            <th className="px-6 py-3">DELETE</th>
                            <th className="px-6 py-3">DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query, index) => (
                            <tr
                                key={query._id}
                                className={`text-center border-b ${
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                } hover:bg-slate-200`}
                            >
                                <td className="px-10 py-5 font-bold">{query.order_id}</td>
                                <td className="px-10 py-5 font-bold">{query.product_id}</td>
                                <td className="px-10 py-5 font-bold">{query._id}</td>
                                <td className="px-6 py-2">{query.customerName}</td>
                                <td className="px-6 py-2 text-blue-500 font-semibold">
                                    <a href={`mailto:${query.email}`}>{query.email}</a>
                                </td>
                                <td className="px-6 py-2">{query.contactNumber}</td>
                                <td className="px-6 py-2">{query.issue}</td>
                                <td className="px-6 py-2">
                                    <button
                                        className="px-2 py-1 rounded-md bg-fuchsia-400 hover:bg-red-600 hover:text-white cursor-pointer"
                                        onClick={() => deleteQuery(query._id)}
                                    >
                                        DELETE
                                    </button>
                                </td>
                                <td className="px-6 py-2">
                                    <button className="px-2 py-1 rounded-md bg-green-400 hover:bg-yellow-400 cursor-pointer">
                                        VIEW
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer theme="light" position="bottom-center" />
        </>
    );
};

export default QueryList;
