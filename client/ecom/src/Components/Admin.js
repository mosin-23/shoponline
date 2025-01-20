import React from 'react'
import Nav from './Nav'
import ProductListing from './ProductListing'
const Admin = ({setlogged}) => {



  return (
    <>
    <Nav/>
    <ProductListing/>{/*Here We will list the products and manipulate them*/}
    </>
  )
}

export default Admin
