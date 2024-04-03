"use client";
import React, { createContext, useContext, useState } from "react";
import { Product } from "@/app/type/ProductModel";

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product: Product) => {
    const newItem = product;
    setCart((prevCart) => [...prevCart, newItem]);
    console.log(cart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
