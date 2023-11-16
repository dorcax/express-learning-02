import React from 'react'
import Sidebar from '../../component/SideBar/Sidebar'
import Navbar from '../../component/NavBar/Navbar'
import Products from "../../component/Product/Products"
import "./product.css"

const Product = () => {
  return (
      <div className='products'>
          <Sidebar />
          <div className="product-container">
              <Navbar />
              <div className="product-form">
                  <Products />
            </div>
          </div>
   
    </div>
  )
}

export default Product
