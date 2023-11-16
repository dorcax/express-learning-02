import React from 'react'
import "./navbar.css"
import useFetch from '../Table/UseFetch';
const Navbar = () => {

     let id = sessionStorage.getItem("userId");
     //  let id = sessionStorage.getItem("UserId");
     const { Data, Loading, Error } = useFetch(
       `http://localhost:5000/product/${id}`
  );
  // let name =Data.vendor.name
  return (
    <div className='navbar-container'>
      <div className="search">
              <i class="fa-solid fa-search"></i>
              <input type="search" name="" id="" />
          </div>
          <div className="nav-text">
              <i class="fa-solid fa-bell"></i>
        {Data && <h2> {Data.name}</h2>}
          </div>
    </div>
  );
}

export default Navbar
