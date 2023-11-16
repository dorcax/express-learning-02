import React from 'react'
import "./transaction.css"
const Transaction = ({data}) => {
  return (
    <div className="transaction-container">
      <div className="transact-detail">
        transaction details
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>item Name</th>
            <th>quantity</th>
            <th>amount sold</th>
                      <th>customer name</th>
                      <th>delete</th>
          </tr>
        </thead>
        <tbody>
                  {
                      data.transaction.map((er) => (
                          <tr>
                          <td>{er.id}</td>
                          <td>{er.product.name}</td>
                          <td>{er.quantity}</td>
                          <td>{er.pricesold}</td>
                          <td>{ er.customer.name}</td>
                          </tr>
                      ))
                  }
                  </tbody>
      </table>
    </div>
  );
}

export default Transaction
