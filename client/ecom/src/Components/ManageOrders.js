import axios from 'axios'
import React, { useEffect, useState } from 'react'
axios.defaults.baseURL='https://shoponline-e2qx.onrender.com'
const ManageOrders = ({setlogged}) => {
    const [orderdata,setdata]=useState([]);
    const GetOrders=async()=>{
        try {
           const resp=await axios.get('/payment/getOrders',
            {
                headers:{
                    Authorization:localStorage.getItem('authToken')
                }
            }
           ) 
           setdata(resp.data);
        } catch (error) {
            console.error('Error Loading Orders');
        }
    }
    const DeleteOrder=async(oid)=>{
      try {
        const resp=await axios.delete(`/payment/deleteOrder/${oid}`,{
          headers:{
            Authorization:localStorage.getItem('authToken')
          }
        })
      setdata(prevData => prevData.filter(order => order._id !== oid))
      } catch (error) {
        console.log('Error Deleting the Order')
      }
    }
    const DeliveryStatusTransit=async(oid)=>{
      try {
        const resp=await axios.patch(`/payment/order/${oid}`,{
          delivery_status:"Transit"
        },{
          headers:{
            Authorization:localStorage.getItem('authToken')
          }
        })
        setdata((prevData) =>
          prevData.map((order) =>
            order._id === oid ? { ...order, delivery_status: "Transit" } : order
          )
        );
      } catch (error) {
        console.log('Error Setting DL Status')
      }
    }
    const DeliveryStatusDelivered=async(oid)=>{
      try {
        const resp=await axios.patch(`/payment/order/${oid}`,{
          delivery_status:"Delivered"
        },{
          headers:{
            Authorization:localStorage.getItem('authToken')
          }
        })
        setdata((prevData) =>
          prevData.map((order) =>
            order._id === oid ? { ...order, delivery_status: "Delivered" } : order
          )
        );
      } catch (error) {
        console.log('Error Setting DL Status')
      }
    }
useEffect(()=>{
    GetOrders();
},[])
  return (
      
    <div className='flex flex-col m-5 items-center justify-center'>
  <table className='table-auto w-auto max-w-4xl shadow-lg cursor-pointer rounded-lg border border-2 border-black border-r-2 '>
    <thead className='bg-slate-600 text-white '>
      <tr className='text-center'>
        <th className='px-2 py-3'>ID</th>
        <th className='px-2 py-3'>Order ID</th>
        <th className='px-2  py-3'>Order Date</th>
        <th className='px-2 py-3'>Order_Amount</th>
        <th className='px-2 py-3'>Order_Status</th>
        <th className='px-2 py-3'>User_ID</th>
        <th className='px-2 py-3'>Ordered Item</th>
        <th className='px-2 py-3 '>Razorpay_Payment_ID</th>
        <th className='px-2 py-3 '>DL STATUS</th>
        <th className='px-2 py-3 '>OPERATE</th>
      </tr>
    </thead>
    <tbody>
      {
        orderdata.map((u, index) => (
          <>
          <tr key={index} className={`text-center border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-slate-200`}>
            <td className='px-1 py-5 font-bold'>{u._id}</td>
            <td className='px-1 py-2'>{u.order_id}</td>
            <td className='px-1 py-2  font-semibold'>{new Date(u.order_date).toLocaleDateString()}</td>
            <td className='px-1 py-2 '>{u.order_amount}</td>
            <td className='px-1 py-2 font-bold'>{u.order_status}</td>
            <td className='px-1 py-2'>{u.userId}</td>
            <td className='px-1 py-2'>{u.ordersitem}</td>
            <td className='px-1 py-2'>{u.razorpay_payment_id}</td>
            <td className={`px-1 py-2 font-bold ${u.delivery_status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>{u.delivery_status}</td>
            <td className="flex flex-col p-2">
  <button className="bg-fuchsia-400 py-2 px-3 mb-1" onClick={() => DeliveryStatusTransit(u._id)}>
    TRANSIT
  </button>
  <button className="bg-blue-300 py-2 px-3 mb-1" onClick={() => DeliveryStatusDelivered(u._id)}>
    DELIVERED
  </button>
  <button className="bg-green-400 py-2 px-3" onClick={() => DeleteOrder(u._id)}>
    DELETE
  </button>
</td>

            
          </tr>
          </>
        ))
      }
    </tbody>
  </table>
</div>

  )
}

export default ManageOrders
