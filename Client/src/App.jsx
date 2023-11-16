
import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Product from './pages/Product/Product'
import Login from "./pages/Form/Register/Login"
import Register from "./pages/Form/Register/Register";
import { ToastContainer } from 'react-toastify'
import UserList from './pages/User/UserList'
import Transaction from './pages/Transaction/Transaction'

const App = () => {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/">
            <Route index element={<Home />}></Route>

            <Route path="users">
              <Route index element={<UserList />}></Route>
            </Route>
            <Route path="product">
              <Route index element={<Product />} />
              {/* <Route path=':id' element={<DeleteProduct />}/> */}
            </Route>
            <Route path="transaction">
              <Route index element={<Transaction/>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
