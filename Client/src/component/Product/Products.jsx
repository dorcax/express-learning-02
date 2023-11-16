import { React,useState } from "react";
import "./products.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom"
// import axios from "axios"


const Products = () => {
  const [data, setData] = useState({ name: "", description: "", quantity: "", price:""  })
  const handleChange = (evt) => {
    const changeField =evt.target.name
    const changeValue = evt.target.value
    setData((previousData) => {
      return {
        ...previousData,
        [changeField]:changeValue

      }
    })
    console.log(changeValue)

  }
   const navigate =useNavigate()
  // const [name, setName] = useState("")
  // const [description, setDescription] = useState("")
  // const [quantity, setQuantity] = useState("")
  // const[price,setPrice] =useState("")
    

  
  const HandleSubmit = (evt) => {
  
    evt.preventDefault()
    const price = data.price
    const quantity =data.quantity
    const reg = {
      name: data.name,
      description: data.description,
      price: +price,
      quantity:+quantity
    }
    let userId =sessionStorage.getItem('userId')
    fetch(`http://localhost:5000/product/${userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
         Authorization:`Bearer ${sessionStorage.getItem("jwtToken")}`
      },
      body: JSON.stringify(reg),
    }).then((response) => response.json())
    
      .then((result) => {
        console.log(result);
        navigate("/")
        toast.success("product created");
      })
      .catch((error) => {
        toast.error(error);
      });
    
  }
  return (
    <div className="product">
      <div className="product-text">
        <h2>add product</h2>
      </div>
      <form onSubmit={HandleSubmit} className="addproduct">
        <div className="form-details">
          <label htmlFor="name">name</label>
          <input
            type="text"
            name="name"
            id=""
            value={data.name}
            onChange={handleChange}
            // value={name}
            // onChange={(evt)=>setName(evt.target.value)}
          />
        </div>
        <div className="form-details">
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            id=""
            value={data.description}
            onChange={handleChange}
            // value={description}
            // onChange={(evt)=>setDescription(evt.target.value)}
          />
        </div>
        <div className="form-details">
          <label htmlFor="price">price</label>
          <input
            type="number"
            name="price"
            id=""
            value={data.price}
            onChange={handleChange}
            // value={price}
            // onChange={(evt)=>setPrice(evt.target.value)}
            // max="10000"
          />
        </div>
        <div className="form-details">
          <label htmlFor="quantity">quantity</label>
          <input
            type="number"
            name="quantity"
            id=""
            value={data.quantity}
            onChange={handleChange}
            // value={quantity}
            // onChange={(evt)=>setQuantity(evt.target.value)}
          />
        </div>

        <div className="submit">
          <input type="submit" value=" add product" />
        </div>
      </form>
    </div>
  );
}

export default Products
