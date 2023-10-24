// CartContext.js

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return addToCart(state, action.item);
    case 'REMOVE_FROM_CART':
      return removeFromCart(state, action.itemId);
    case 'INCREASE_QUANTITY':
      return increaseQuantity(state, action.itemId);
    case 'DECREASE_QUANTITY':
      return decreaseQuantity(state, action.itemId);
    default:
      return state;
  }
};

function addToCart(cart, newItem) {
  const existingItem = cart.find((item) => item.id === newItem.id);
  if (existingItem) {
    return cart.map((item) =>
      item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...cart, { ...newItem, quantity: 1 }];
  }
}

function removeFromCart(cart, itemId) {
  return cart.filter((item) => item.id !== itemId);
}

function increaseQuantity(cart, itemId) {
  return cart.map((item) =>
    item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  );
}

function decreaseQuantity(cart, itemId) {
  const item = cart.find((item) => item.id === itemId);
  if (item && item.quantity > 1) {
    return cart.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
    );
  } else {
    return removeFromCart(cart, itemId);
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ cart, totalQuantity, totalAmount, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;