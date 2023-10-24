// ProductList.jsx

import React from 'react';
import { useCart } from './CartContext';
import './App.css'

const ProductList = ({ products }) => {
  const { dispatch } = useCart();

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', item: product });
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"></img>
          <h3 className="product-title">{product.category}</h3>
          <h3 className="product-title">{product.brand}</h3>
          <h3 className="product-title">{product.description}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          
          
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;