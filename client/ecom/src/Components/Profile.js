import { useState,useEffect} from "react"
import axios from "axios";
import React from 'react'
import ConfirmDetails from './ConfirmDetails';

import profile from './profile.png'
axios.defaults.baseURL="https://ecom-qzh4.onrender.com/"
const Profile =()=> {
    const[pdata,setpdata]=useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const id=localStorage.getItem('id');
    const token=localStorage.getItem('authToken');
    const FetchUser=async()=>{
        try {
            
            const res= await axios.get(`user/${id}`,{
                headers:{
                    Authorization:token
                }
            })
            setpdata(res.data);
        } catch (error) {
            console.err("Error Fetching User");
        }
    }
useEffect(()=>{
FetchUser();
},[])
  return (
    <>
    <ConfirmDetails
  isOpen={isModalOpen}
  closeModal={closeModal}/>
    <div className="flex justify-center items-center min-h-screen cursor-default font-mono ">
    <div className="flex flex-col items-center justify-center py-5  border border-2 border-emerald-400 rounded-lg w-fit h-auto shadow-cyan-400 shadow-lg hover:shadow-cyan-500 hover:shadow-sky-600">
    <div className="flex flex-row justify-center items-center "><img src={profile} className="w-20 h-auto shadow-md shadow-slate-500 rounded-full hover:shadow-lg hover:shadow-red-600 mb-2 " alt="" srcset="" /><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ml-5" onClick={()=>{ openModal();}}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
</div>
     <h1 className="px-2 py-2 flex"><span className="text-emerald-700 mr-2">Profile Id:-</span> {pdata._id}</h1>
      <h1 className="px-2 py-2 flex"><span className="text-emerald-700 mr-2">Name:- </span>     {pdata.name}</h1>
      <h2 className="px-2 py-2 flex"><span className="text-emerald-700 mr-2">Email :-</span> <span className="font-bold">{pdata.email}</span></h2>
      <h2 className="px-2 py-2 flex"><span className="text-emerald-700 mr-2">Mobile :-</span> {pdata.mobile}</h2>
      <h2 className="px-2 py-2 flex"><span className="text-emerald-700 mr-2">Address :-</span> {pdata.Address}</h2>
      <h2 className="px-2 py-2 flex"><span className="text-emerald-700 mr-2">Pincode :-</span> {pdata.pincode}</h2>


    </div>
    </div>
    </>
  )
}

export default Profile
