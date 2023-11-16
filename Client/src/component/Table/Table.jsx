import React from 'react'
import "./table.css"
import { Link } from 'react-router-dom'
// import useFetch from '../UseFetch'
const Table = ({ data }) => {

  return (
    <div className="table-container">
   
      <table className='tableList'>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>quantity</th>
            <th>price</th>
            <th>Edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {data.product.map((er) => (
            <tr key={er.id}>
              <td>{er.name}</td>
              <td>{er.description}</td>
              <td>{er.quantity}</td>
              <td>{er.price}</td>
              <td Link>edit</td>
              <td>delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table
