import React, { useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import{useNavigate} from "react-router-dom"

import "./form.css"
const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" })
  const handleChange = (evt) => {
    const changeField = evt.target.name
    const changeValue = evt.target.value
    setData((previousData) => {
      return {
        ...previousData,[changeField]:changeValue
      }
    })
    
  }
  const navigate =useNavigate()

  const HandleSubmit = (evt) => {
    evt.preventDefault()
    fetch("http://localhost:5000/vendor", {
      method: "POST",
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    }).then((res) => {
      toast.success("vendor registered")
      navigate("/login")
    }).catch((error) => {
      toast.error(error)
    })
  }
  return (
    <div className="register">
      <div className="image b">
        <h2>vendor registration</h2>

        <form  onSubmit={HandleSubmit}>
          <div className="form-label">
      
            <input type="text" name="name" id="" placeholder="Enter your name"  value={data.name} onChange={handleChange}/>
          </div>
          <div className="form-label">
            <input type="email" name="email" id="" placeholder="Enter your email"  value={data.email} onChange={handleChange}/>
          </div>
          <div className="form-label">
            <input type="password" name="password" id="" placeholder="password" value={data.password} onChange={handleChange} />
          </div>
          <div className="submits">
            <input type="submit" value="register" />
          </div>
          <div className="input-text">
            Already have an account? <a href="/login">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
