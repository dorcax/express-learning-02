import React from 'react'
import "./sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        {/* <img src="../src/assets/image/logoipsum-225.svg" alt="company logo" /> */}
        <h2>smartEcommerce</h2>
      </div>
      <nav>
        <ul>
          <li>
            <i class="fa-solid fa-chart-pie"></i>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <i class="fa-solid fa-list"></i> <a href="/product">Product</a>
          </li>
          {/* <li>
            <i class="fa-solid fa-user"></i> <a href="">User</a>
          </li> */}
          <li>
            <i class="fa-solid fa-list"></i>
            <a href="/users">List user</a>
          </li>
          <li>
            <i class="fa-solid fa-list"></i>
            <a href="/transaction">Transaction</a>
          </li>
          <li>
            <i class="fa-solid fa-user"></i> <a href="/login">Login</a>
          </li>
          <li>
            <i class="fa-solid fa-user"></i> <a href="">logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar
