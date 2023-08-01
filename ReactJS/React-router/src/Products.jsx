import React from "react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>Products Page</h1>
      <ul>
       <li><Link to='/products/p1'>Book</Link></li>
       <li><Link to='/products/product2'>Hands-free</Link></li>
       <li><Link to='/products/product3'>Laptop</Link></li>
      </ul>
    </>
  )
};

export default Products;
