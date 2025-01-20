import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL='https://ecom-qzh4.onrender.com';
const Users = ({setlogged}) => {
  const token=localStorage.getItem('authToken');
  const id=localStorage.getItem('id');
  const[user,setuser]=useState([]);
  const getUsers=async()=>{
    try {
      const resp=await axios.get('/users',{
        headers:{
          Authorization:token
        }
      });
      setuser(resp.data);
    } catch (error) {
      console.error('Error fetching users');
    }
  }
  const deleteUser=async(id)=>{
    try {
      const resp=await axios.delete(`/user/${id}`,{
        headers:{
          Authorization:token
        } 
      });
      setuser(user.filter(u=>u._id!==id))
    } catch (error) {
      console.error('Error deleting a user!');
    }
  }
  const rmuser=()=>{
    toast("User Deleted Successfully",{
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
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
        <th className='px-6 py-3'>Name</th>
        <th className='px-6 py-3'>E-Mail</th>
        <th className='px-6 py-3'>Mobile</th>
        <th className='px-6 py-3'>Role</th>
        <th className='px-6 py-3'>EDIT</th>
        <th className='px-6 py-3 '>DETAILS</th>
      </tr>
    </thead>
    <tbody>
      {
        user.map((u, index) => (
          <>
          <tr key={index} className={`text-center border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-slate-200`}>
            <td className='px-10 py-5 font-bold'>{u._id}</td>
            <td className='px-6 py-2'>{u.name}</td>
            <td className='px-6 py-2 text-blue-500 font-semibold'><a href={`mailto:${u.email}`}>{u.email}</a></td>
            <td className='px-6 py-2'>{u.mobile}</td>
            <td className={`px-6 py-2  ${u.role==='admin'?'text-red-500 font-bold uppercase':'text-black'}`}>{u.role}</td>
            <td className='px-6 py-2'><button className={`px-2 py-1 rounded-md bg-fuchsia-400 hover:bg-red-600 hover:text-white cursor-pointer ${u.role==='admin'?'cursor-not-allowed opacity-0':'text-black'}`} onClick={()=>{deleteUser(u._id);rmuser();}}>DELETE</button></td>
            <td className='px-6 py-2'><button className='px-2 py-1 rounded-md bg-green-400 hover:bg-yellow-400  cursor-pointer' >VIEW</button></td>
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

export default Users
