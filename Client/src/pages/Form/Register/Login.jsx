import React, { useState } from 'react'
import "./form.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" })
  const handleChange = (evt) => {
    const changeField = evt.target.name
    const changeValue = evt.target.value
    setData((previous) => {
      return {
        ...previous, [changeField]:changeValue
      }
    })
   
  }
  const navigate =useNavigate()
   const HandleSubmit = (evt) => {
     evt.preventDefault();
     fetch("http://localhost:5000/vendor/login", {
       method: "POST",
       headers: {
         "content-type": "application/json",
        
       },
       body: JSON.stringify(data)
     })
       .then((result) => {
         console.log(result);
         return result.json();
       })
       .then((res) => {
         console.log(res);
         const jwtToken = res.token
         console.log(jwtToken)
         let userId = res.vendor.id
         console.log(userId)
         sessionStorage.setItem("jwtToken", jwtToken);
         sessionStorage.setItem("userId", userId)
          navigate("/");
         toast.success("vendor logged in");
       
       });
   };
  return (
    <div className='register'>
  
      <div className="image a">
        <h2>vendor admin login</h2>
        <form onSubmit={HandleSubmit}>
          <div className="form-label">
            <input type="text" placeholder='Enter your name' name="email" value={data.email} onChange={handleChange} />
          </div>
          <div className="form-label">
            <input type="password" name="password" id="" value={data.password} onChange={handleChange} />
          </div>
          <div className="submits">
            <input type="submit" value="Login" />
          </div>
          <div className="input-text">
            Not a vendor <a href="/register">sign up now</a>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
