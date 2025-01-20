import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'https://ecom-qzh4.onrender.com';

const View = () => {
  const [data, setdata] = useState({});
  const [inflatedPrice, setInflatedPrice] = useState(0);
  const { id } = useParams();
  const nav=useNavigate();

  const GetPro = async () => {
    try {
      const resp = await axios.get(`product/${id}`, {
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      });
      setdata(resp.data);
    } catch (error) {
      console.log('Error loading the product');
    }
  };

  const calculateInflatedPrice = (price) => {
    const randomExtraPercentage = Math.floor(Math.random() * 10) + 1;
    const extraAmount = (price * randomExtraPercentage) / 100;
    return price + extraAmount;
  };
  const HandleCart=async(id)=>{
    try {
        const resp=await axios.post('/product/addItem',{
            uid:localStorage.getItem('id'),
            pid:id
        },
        {
        headers:{
            Authorization:localStorage.getItem(
              'authToken'
            )
        }
        });
        console.log('product added to cart');
    } 
    catch (error) {
        console.error("Error Adding to Cart!");
    }
}

  useEffect(() => {
    GetPro();
  }, [id]);

  useEffect(() => {
    if (data.price) {
      const inflated = calculateInflatedPrice(data.price);
      setInflatedPrice(inflated);
    }
  }, [data]);

  const discountAmount = (inflatedPrice || 0) - (data.price || 0);

    
     return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 ml-16 cursor-pointer mt-10 "
        onClick={() => {
          nav('/');
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
      <div className="flex flex-col items-center mt-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg max-w-4xl w-full">
          <div className="relative w-full md:w-1/2">
            <img
              src={data.image}
              alt=""
              className="w-full h-64 object-contain rounded-t-md md:rounded-l-md md:rounded-tr-none"
              loading="lazy"
            />
          </div>
          <form className="flex-auto p-6">
            <div className="flex flex-col space-y-4">
              <h1 className="text-lg font-semibold text-slate-900">
                {data.title}
              </h1>
              <div>
                <h1 className="line-through text-xs text-slate-500">
                  MRP: ₹{inflatedPrice ? inflatedPrice.toFixed(2) : 'Loading...'}
                </h1>
                <div className="text-green-500 text-xl font-semibold">
                  Discounted Price: ₹{data.price ? data.price.toFixed(2) : 'Loading...'} <br />
                  <span className="text-sm">
                  You Save ₹{inflatedPrice && data.price ? discountAmount.toFixed(2) : 'Calculating...'} 
                  </span>
                </div>
              </div>
              <div className="text-sm text-slate-700">In stock</div>
              <div className="text-sm text-slate-700">CATEGORY: {data.category}</div>
            </div>
            <p className="text-sm text-slate-700 mt-4">{data.description}</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6">
              <button
                className="h-10 px-6 w-full md:w-auto font-semibold rounded-md bg-black text-white"
                type="button"
                onClick={async () => {
                  await HandleCart(id);
                  nav('/cart');
                }}
              >
                Buy now
              </button>
              <button
                className="h-10 px-6 w-full md:w-auto font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
                onClick={async () => {
                  await HandleCart(id);
                  nav('/cart');
                }}
              >
                Add to bag
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FBBF24"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hover:fill-amber-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <div className="text-slate-900 font-semibold text-lg">
                {data.rating}
              </div>
            </div>
            <p className="text-sm text-slate-700 mt-4">
              Free shipping on all orders above <span className="font-bold">₹499.</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default View;
