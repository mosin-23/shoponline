import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'https://ecom-qzh4.onrender.com';

const Cards = () => {
    const [data, setData] = useState([]);
    const [sdata, setSdata] = useState([]);
    const [search, setSearch] = useState('');
    const token = localStorage.getItem('authToken');
    const nav = useNavigate();

    // Fetch products
    const handleData = async () => {
        try {
            const resp = await axios.get('/getProducts', {
                headers: { Authorization: token },
            });
            setData(resp.data);
            setSdata(resp.data);
        } catch (err) {
            console.log('Error fetching products:', err);
        }
    };

    // Add to cart
    const handleCart = async (productid) => {
        try {
            await axios.post('/product/addItem', { 
                uid: localStorage.getItem('id'), 
                pid: productid 
            }, { 
                headers: { Authorization: token } 
            });
            toast.success('Product added to cart!');
        } catch (err) {
            console.error('Error adding to cart:', err);
            toast.error('Error adding product to cart!');
        }
    };

    // Sort products
    const handleSelect = async (e) => {
        const [field, order] = e.target.value.split('.');
        try {
            const resp = await axios.get(`/getProducts?sort=${field}&order=${order}&limit=4`, {
                headers: { Authorization: token },
            });
            setSdata(resp.data);
        } catch (err) {
            console.log('Error sorting products:', err);
        }
    };

    // Search functionality
    const handleSearch = () => {
        if (search.trim() === '') {
            setSdata(data);
        } else {
            const filteredData = data.filter(product =>
                product.title.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())
            );
            setSdata(filteredData);
        }
    };

    const resetSearch = () => {
        setSearch('');
        setSdata(data);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleViewClick = (id) => {
        nav(`/view/${id}`);
    };

    const handleBuyNow = (productid) => {
        handleCart(productid);
        toast.success('Redirecting to cart...');
        setTimeout(() => {
            nav('/cart');
        }, 2000);
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <>
        
        <div className="flex flex-col md:flex-row justify-center bg-[#aac7e6] p-5">
    <div className="flex flex-col md:flex-row items-center space-x-2 w-full md:w-auto justify-center md:justify-start">
        {search && (
            <button onClick={resetSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 fill-fuchsia-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        )}
        <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full md:w-[300px] lg:w-[450px] border-2 border-sky-400 focus:outline-sky-500 rounded-md px-5 py-2 text-center mb-3 md:mb-0"
        />
        <button onClick={handleSearch} className="bg-[#38BDF8] text-white px-5 py-2 rounded-md hover:bg-[#2c99c1] mb-3 md:mb-0">
            Search
        </button>
    </div>
    <select
        onChange={handleSelect}
        className="ml-0 md:ml-5 border-2 border-[#2DD4BF] rounded-md px-3 py-2 focus:outline-[#14B8A6] w-full md:w-auto mt-3 md:mt-0"
    >
        <option value="price.asc">Sort Price Low to High</option>
        <option value="price.desc">Sort Price High to Low</option>
        <option value="rating.asc">Sort Rating Low to High</option>
        <option value="rating.desc">Sort Rating High to Low</option>
    </select>
</div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                {sdata.length > 0 ? (
                    sdata.map((product) =>
                        product.quantity > 0 && (
                            <div
                                key={product._id}
                                className="card w-full p-5 rounded-md border shadow-lg hover:shadow-emerald-500 hover:border-emerald-400"
                            >
                                <h2 className="font-bold uppercase italic">{product.category}</h2>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-44 object-contain rounded-md"
                                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                                />
                                <hr className="my-2 border-black" />
                                <h3 className="font-bold ">{product.title}</h3>
                                <p>Price: INR <span className='font-semibold'>{product.price}</span> /-</p>
                                <div className="flex justify-center items-center space-x-2">
                                    <span>Rating: {product.rating}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FBBF24" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5a.562.562 0 011.04 0l2.125 5.11a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </div>
                                <div className="flex justify-between mt-3">
                                    <button
                                        onClick={() => handleViewClick(product._id)}
                                        className="bg-black text-white px-3 py-2 rounded-md hover:bg-gray-700"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(product._id)}
                                        className="bg-teal-400 text-white px-3 py-2 rounded-md hover:bg-teal-600"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        )
                    )
                ) : (
                    <Loader />
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default Cards;
