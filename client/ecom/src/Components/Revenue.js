import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CountUp } from 'countup.js';
axios.defaults.baseURL='https://shoponline-e2qx.onrender.com'
const Revenue = () => {
    const [rv, setRv] = useState({ totalRevenue: 0, totalOrders: 0 });
        const GetAmount=async()=>{
        const resp=await axios.get('/payment/getRevenue',{
            headers:{
                Authorization:localStorage.getItem('authToken')
            }
        })
        setRv(resp.data);
    }
useEffect(()=>{
GetAmount()
},[])
useEffect(() => {
    if (rv.totalRevenue && rv.totalOrders) {
        // Initialize CountUp animations after rv state is updated
        new CountUp('state1', rv.totalRevenue).start();
        new CountUp('state2', rv.totalOrders).start();
    }
}, [rv]);
  return (
    <div className='flex flex-col justify-center items-center mt-16 '>
  <h1 className='text-3xl mb-5'>REVENUE GENERATED</h1>

  {/* Card for Earnings */}
  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 text-center cursor-default">
    <div className="py-4 border border-dashed rounded-lg border-slate-400">
      <h6 className="relative mb-0 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500 text-xl">Earnings</h6>
      <h4 className="font-bold dark:text-black">
        <span className="text-3xl">₹</span>
        <span id="state1" className="text-3xl" countTo={rv.totalRevenue}></span>
      </h4>
    </div>
  </div>

  {/* Card for Successful Orders */}
  <div className="w-full sm:w-1/2 lg:w-1/3 px-3 text-center mt-10 cursor-default">
    <div className="py-4 border border-dashed rounded-lg border-slate-400">
      <h6 className="relative mb-0 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-purple-700 to-pink-500 text-xl">Successful Orders</h6>
      <h4 className="font-bold dark:text-black">
        <span className="text-3xl"></span>
        <span id="state2" className="text-3xl" countTo={rv.totalOrders}></span>
      </h4>
    </div>
  </div>
</div>
 )
}

export default Revenue
