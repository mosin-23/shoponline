import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL='https://shoponline-e2qx.onrender.com';
const Products = ({setlogged}) => {
  const token=localStorage.getItem('authToken');
  const id=localStorage.getItem('id');
  const[user,setuser]=useState([]);
  const getUsers=async()=>{
    try {
      const resp=await axios.get('/getProducts',{
        headers:{
          Authorization:token
        }
      });
      setuser(resp.data);
    } catch (error) {
      console.error('Error fetching Products');
    }
  }
  const deleteUser=async(id)=>{
    try {
      const resp=await axios.delete(`/delete/${id}`,{
        headers:{
          Authorization:token
        } 
      });
      setuser(user.filter(u=>u._id!==id))
    } catch (error) {
      console.error('Error deleting a Product!');
    }
  }
  const rmuser=()=>{
    toast("Product Deleted Successfully",{
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>       
    })
  }
  useEffect(()=>{
getUsers();
  },[])
  return (
    <>
    <div className='flex flex-col m-5 items-center justify-center'>
  <table className='table-auto w-full max-w-4xl shadow-lg cursor-pointer rounded-lg border border-2 border-black border-r-2'>
    <thead className='bg-slate-600 text-white '>
      <tr className='text-center'>
        <th className='px-6 py-3'>User ID</th>
        <th className='px-6 py-3'>Title</th>
        <th className='px-6 py-3'>Category</th>
        <th className='px-6 py-3'>Price</th>
        <th className='px-6 py-3'>Quantity</th>
        <th className='px-6 py-3'>Rating</th>
        <th className='px-6 py-3'>EDIT</th>
        <th className='px-6 py-3 '>IMG</th>

      </tr>
    </thead>
    <tbody>
      {
        user.map((u, index) => (
          <>
          <tr key={index} className={`text-center border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-slate-200`}>
            <td className='px-10 py-5 font-bold'>{u._id}</td>
            <td className='px-6 py-2'>{u.title}</td>
            <td className='px-6 py-2  font-semibold'>{u.category}</td>
            <td className='px-6 py-2'>{u.price}</td>
            <td className='px-6 py-2'>{u.quantity}</td>
            <td className='px-6 py-2'>{u.rating}</td>
            <td className='px-6 py-2'><button className={`px-2 py-1 rounded-md bg-fuchsia-400 hover:bg-red-600 hover:text-white cursor-pointer ${u.role==='admin'?'cursor-not-allowed opacity-0':'text-black'}`} onClick={()=>{deleteUser(u._id);rmuser();}}>DELETE</button></td>
            <td className='px-6 py-3'>{<img src={u.image} alt="" className='h-10 w-10 object-cover' />}</td>
          </tr>
          </>
        ))
      }
    </tbody>
  </table>
</div>
<ToastContainer theme='light' position='bottom-center'/>
    </>
  )
}

export default Products
 