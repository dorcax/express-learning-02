import React from 'react'
import Sidebar from '../../component/SideBar/Sidebar'
import Navbar from '../../component/NavBar/Navbar'
import Transactiondetails from '../../component/Transaction/Transactiondetails'
import "./transact.css"

const Transaction = () => {
    return (
      
      <div className='transact'>
           <Sidebar />
           <div className="transact-navbar">
               <Navbar />
               <div className="transact-details">
                  <Transactiondetails />
               </div>
          </div>
      
</div>
  )
}

export default Transaction
