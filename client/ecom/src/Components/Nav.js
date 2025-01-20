import React from 'react'
import { Link } from 'react-router-dom'
const Nav = ({setlogged}) => {
  return (
    <>
      <div className="navbar flex mt-5 lg:space-x-80 items-center justify-center">
      <h1 className='font-bold ml-10 hover:shadow-lg rounded-lg cursor-pointer' onClick={()=>{window.location.reload()}}>MOSINCART</h1>
      <ul className='flex space-x-4 items-center justify-center justify-around'>
      <li></li>
        <li className='cursor-not-allowed'>Welcome  <span className='font-semibold text-fuchsia-600 cursor-not-allowed  '>  {localStorage.getItem('name')}</span></li>
        <li className='cursor-pointer  px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md'><Link to="/admin">HOME</Link></li>
        <li className='cursor-pointer  px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md'><Link to="/admin/users">USERS</Link></li>
        <li className='cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md'><Link to="/admin/orders">ORDERS</Link></li>
        <li className='cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md'><Link to="/admin/payments">PAYMENTS</Link></li>
        <li className='cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md'><Link to="/admin/products">PRODUCTS</Link></li>
        <li className='cursor-pointer px-2 py-1 text-red-600 hover:bg-pink-500 hover:text-white rounded-md'><Link to="/admin/query">QUERIES</Link></li>
        <li className='cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md ' onClick={()=>{localStorage.clear();}}><Link to="/">LOGOUT</Link></li>
      </ul>
    </div>
    </>
  )
}

export default Nav
