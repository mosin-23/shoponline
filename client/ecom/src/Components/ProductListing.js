import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.baseURL='https://ecom-qzh4.onrender.com'
const ProductListing = () => {
    const token=localStorage.getItem('authToken');
    const [productData, setProductData] = useState({
        title: '',
        category: '',
        image: '',
        rating: '',
        quantity: '',
        price: '',
        id:'',
        updatevalue:'',
        select:'',
        productField:'',
        description:''
      });
      const handleChange=(e)=>{
        const{name,value}=e.target;
        setProductData({...productData,[name]:value})
      }

    const ListProduct=async()=>{
        try {
            const resp=await axios.post('/addProduct',{
                image:productData.image,
                title:productData.title,
                quantity:productData.quantity,
                category:productData.category,
                price:productData.price,
                rating:productData.rating,
                description:productData.description
            },{
                headers:{
                    Authorization:token
                }
            })
            SuccessPro();
        } catch (error) {
            console.error('Error Adding Product to DB',error)
            ErrorPro();
        }
    }

    const updateProduct=async()=>{
        try {
            const resp=await axios.patch(`/update/${productData.id}`,{
                [productData.productField]: productData.updatevalue,
            },{
                headers:{
                    Authorization:token
                }
            })
            UpdatedPro();
        } catch (error) {
            console.error('Error Adding Product!',error);
            ErrorPro();
        }
    }

    const ErrorPro=()=>{toast.error('Error Adding Product to Database?',{position:'top-center'})};
    const SuccessPro=()=>{toast.success('Product Successfully added to database',{position:'top-center'})}
    const UpdatedPro=()=>{toast.success('Product Successfully added to database',{position:'top-center'})}

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (productData.id && productData.updatevalue && productData.productField) {
            updateProduct();
        } else if (productData.title && productData.category && productData.image && productData.rating && productData.quantity && productData.price) {
            ListProduct();
        } else {
            toast.error('Please fill all required fields to add or update a product.', { position: 'top-center' });
        }
    }    

  return (
    <>
    <div className='flex flex-row'>
    <div className='AddProduct flex flex-col mt-8  border border-2 py-4 rounded-lg border-teal-300 hover:shadow-teal-400 max-w-fit px-10 ml-28 hover:shadow-lg hover:shadow-emerald-400 mb-10 hover:border-2 hover:border-purple-400'>
    <div className='flex flex-row justify-center '><h1 className='font-bold mb-4 mr-2'>List a Product</h1>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
</div>

    <form onSubmit={HandleSubmit} className=''>
        <div className='flex flex-col items-center '>
            <div className='w-fit'>
                <label htmlFor="title" className='block mb-1 font-medium'>Title</label>
                <input type="text" name="title" id="title" placeholder='Enter Title' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' value={productData.title} onChange={handleChange} />
            </div>
            <div className='w-fit'>
                <label htmlFor="category" className='block mb-1 font-medium'>Category</label>
                <input type="text" name="category" id="category" placeholder='Enter Category' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' value={productData.category} onChange={handleChange} />
            </div>
            <div className='w-fit'>
                <label htmlFor="image" className='block mb-1 font-medium'>Image</label>
                <input type="text" name="image" id="image" placeholder='Enter Image URL' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' value={productData.image} onChange={handleChange} />
            </div>
            <div className='w-52'>
                <label htmlFor="rating" className='block mb-1 font-medium'>Rating</label>
                <input type="number" name="rating" id="rating" placeholder='0-5' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' min='0' max='5' step='0.1' value={productData.rating} onChange={handleChange} />
            </div>
            <div className='w-52'>
                <label htmlFor="quantity" className='block mb-1 font-medium'>Quantity</label>
                <input type="text" name="quantity" id="quantity" placeholder='Enter Quantity' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' min='1' max='100' value={productData.quantity} onChange={handleChange} />
            </div>
            <div className='w-52'>
                <label htmlFor="price" className='block mb-1 font-medium'>Price</label>
                <input type="number" name="price" id="price" placeholder='Enter Price for Product' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' min='1' max='100000' value={productData.price} onChange={handleChange} />
            </div>
            <div className='w-52'>
                <label htmlFor="description" className='block mb-1 font-medium'>Description</label>
                <input type="text" name="description" id="description" placeholder='Enter Description for Product' className='border border-2 w-full px-2 py-1 rounded-md focus:outline-blue-500' min='1' max='100000' value={productData.description} onChange={handleChange} />
            </div>
            <button className='border border-2 px-4 py-2 mt-4 bg-emerald-500 rounded-xl hover:bg-emerald-600 text-white'>List Product</button>
        </div>
    </form>
</div>
<div className='Update flex flex-row mt-8 items-center'>
<div className='AddProduct flex flex-col mt-8  border border-2 py-4 rounded-lg border-teal-300 hover:shadow-teal-400 max-w-fit px-10 ml-28 hover:shadow-lg hover:shadow-emerald-400 mb-10 hover:border-2 hover:border-purple-400'>
    <div className='flex flex-row justify-center '><h1 className='font-bold mb-4 mr-2'>Update a Product</h1>
</div>

    <form onSubmit={HandleSubmit} className=''>
        <div className='flex flex-col '>
            <div className='w-fit mb-2 flex flex-row items-center justify-center'>
                <input type="text" name="id" id="id" placeholder='Enter ID' className='font-bold border border-2 mt-5 w-72 px-2 py-1 rounded-md focus:outline-blue-500' value={productData.id} onChange={handleChange} />
            </div>
            <div className='w-fit '>
            <label htmlFor="productField" className='block mb-1 font-medium'>Select Product Field</label>
            <select
                name="productField"
                id="productField"
                className='border border-2 w-full px-2 py-1   rounded-md focus:outline-blue-500'
                onChange={handleChange} value={productData.productField}
            >
                <option value="">-- Select --</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
                <option value="rating">Rating</option>
                <option value="image">Image</option>
                <option value="category">Category</option>
                <option value="description">Description</option>
            </select>
            <input type="text" name="updatevalue" id="updatevalue" placeholder='Enter Desired Update' className='border border-2 mt-5 w-full px-2 py-1 rounded-md focus:outline-blue-500' value={productData.updatevalue    } onChange={handleChange} />
        </div>
            <button className='border border-2 px-4 py-2 mt-4 bg-emerald-500 rounded-xl hover:bg-emerald-600 text-white'>Update Product</button>
        </div>
    </form>
</div>
</div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default ProductListing

