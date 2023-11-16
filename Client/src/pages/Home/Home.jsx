import React from 'react'
import "./home.css"
import Sidebar from "../../component/SideBar/Sidebar.jsx"
import Navbar from '../../component/NavBar/Navbar.jsx'
import Card from "../../component/Card/Card.jsx"
// import Table from "../../component/Table/Table.jsx"
import Tabledetails from '../../component/Table/Tabledetails.jsx'
const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homecontainer">
        <Navbar />
        <div className="card-container">
          <Card
            type="Customer"
            quantity="15"
            link="view customer"
            icon="fa fa-user"
          />
        
          <Card
            type="Product"
            quantity="15"
            link="view product"
            icon="fa fa-cart-plus"
          />
          <Card type="transaction" quantity="15" link="view transaction" icon="fa fa-shopping-bag"  />
        </div>
        <div className="table">
         
          <Tabledetails />
        </div>
      </div>
    </div>
  );
}

export default Home
