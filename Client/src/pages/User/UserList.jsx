import React from 'react'
import Sidebar from '../../component/SideBar/Sidebar'
import Navbar from '../../component/NavBar/Navbar'
import Userdatils from '../../component/User/Userdatils'
const UserList = () => {
  return (
    <div className='user'> 
      <Sidebar />
      <div className="navBar">
        <Navbar />
        <div className="user-list">
          <Userdatils />
        </div>
      </div>
    </div>
  )
}

export default UserList
