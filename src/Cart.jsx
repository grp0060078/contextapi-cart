










// Cart.js

import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
const { cart, totalQuantity, totalAmount, dispatch } = useCart();

const increaseQuantity = (itemId) => {
  dispatch({ type: 'INCREASE_QUANTITY', itemId });
};

const decreaseQuantity = (itemId) => {
  dispatch({ type: 'DECREASE_QUANTITY', itemId });
};

return (
  <div className='cart-container'>
    <h2>Shopping Cart</h2>
    {cart.map((item) => (
      <div key={item.id} className='cart-item'>
        <p>{item.name}</p>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: {item.quantity}</p>
        <div className='cart-item-actions' >
        <button onClick={() => increaseQuantity(item.id)}>Increase</button>
        <button onClick={() => decreaseQuantity(item.id)}>Decrease</button>
      </div>
      </div>
    ))}
    <p>Total Quantity: {totalQuantity}</p>
    <p>Total Amount: ${totalAmount.toFixed(2)}</p>
  </div>
);
};

export default Cart;
