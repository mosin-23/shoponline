import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import kali from './kali.png';

const UserNav = ({ setlogged }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar flex items-center justify-between p-4 shadow-md " >
      {/* Logo */}
      <img src={kali} alt="Logo" className="w-20 rounded-full ml-14" style={{ userSelect: 'none', pointerEvents: 'none' }} />

      {/* Hamburger Icon for Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="block lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <ul
        className={`flex flex-col lg:flex-row lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 z-50 ${
          isMenuOpen ? 'block' : 'hidden lg:flex'
        }`}
      >
        <li className="hidden lg:block">
          Welcome{' '}
          <span className="font-semibold text-fuchsia-600">
            {localStorage.getItem('name')}
          </span>
        </li>
        <li className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md">
          <Link to="/">HOME</Link>
        </li>
        <li className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md">
          <Link to="/cart">CART</Link>
        </li>
        <li className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md">
          <Link to="/orders">ORDERS</Link>
        </li>
        <li className="cursor-pointer px-2 py-1 rounded-md">
          <Link to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:bg-lime-100 rounded-xl shadow-lg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </li>
        <li className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md">
          <Link to="/contact">CONTACT</Link>
        </li>
        <li
          className="cursor-pointer px-2 py-1 hover:bg-pink-500 hover:text-white rounded-md"
          onClick={() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('name');
            localStorage.removeItem('role');
            setlogged(false);
          }}
        >
          LOGOUT
        </li>
      </ul>
    </div>
  );
};

export default UserNav;
