import React, { useState, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Login = lazy(() => import('./Components/Login'));
const Cards = lazy(() => import('./Components/Cards'));
const Register = lazy(() => import('./Components/Register'));
const Admin = lazy(() => import('./Components/Admin'));
const Cart = lazy(() => import('./Components/Cart'));
const Users = lazy(() => import('./Components/Users'));
const Nav = lazy(() => import('./Components/Nav'));
const UserNav = lazy(() => import('./Components/UserNav'));
const Profile = lazy(() => import('./Components/Profile'));
const Products = lazy(() => import('./Components/Products'));
const Contact = lazy(() => import('./Components/Contact.js'));
const PageNotFound = lazy(() => import('./Components/404.js'));
const ManageOrders=lazy(()=>import('./Components/ManageOrders.js'))
const View=lazy(()=>import('./Components/View.js'))
const Rev=lazy(()=>import('./Components/Revenue.js'))
const QueryList=lazy(()=>import('./Components/QueryList.js'))
const ListOrders=lazy(()=>import('./Components/ListOrders.js'))
const App = () => {
  const [islogged, setlogged] = useState(false);
  const role = localStorage.getItem('role');

  return (
    <Suspense fallback={<div className='flex justify-center items-center h-screen'><div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin items-center"></div></div>}>
      <Routes>
        <Route path="/" element={islogged && role === 'customer' ? <><UserNav setlogged={setlogged} /><Cards setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/cart" element={islogged && role === 'customer' ? <><UserNav setlogged={setlogged} /><Cart setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/orders" element={islogged && role === 'customer' ? <><UserNav setlogged={setlogged} /><ListOrders setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/profile" element={islogged && role === 'customer' ? <><UserNav setlogged={setlogged} /><Profile setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/contact" element={islogged && role === 'customer' ? <><UserNav setlogged={setlogged} /><Contact setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/view/:id" element={islogged && role === 'customer' ? <><UserNav setlogged={setlogged} /><View setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />

        <Route path="/admin" element={islogged && role === 'admin' ? <Admin setlogged={setlogged} /> : <Login setlogged={setlogged} />} />
        <Route path="/admin/users" element={islogged && role === 'admin' ? <><Nav setlogged={setlogged} /><Users setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/admin/orders" element={islogged && role === 'admin' ? <><Nav setlogged={setlogged} /><ManageOrders setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/admin/products" element={islogged && role === 'admin' ? <><Nav setlogged={setlogged} /><Products setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/admin/payments" element={islogged && role === 'admin' ? <><Nav setlogged={setlogged} /><Rev setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />
        <Route path="/admin/query" element={islogged && role === 'admin' ? <><Nav setlogged={setlogged} /><QueryList setlogged={setlogged} /></> : <Login setlogged={setlogged} />} />

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
