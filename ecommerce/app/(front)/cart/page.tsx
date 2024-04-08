"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/contexts/CartContext";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {Object.keys(cart).length > 0 ? (
        <div>
          {Object.keys(cart).map((key: string) => (
            <div key={key}>
              <span>{key}</span>: <span>{cart[key].length}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
      <p>
        Total items:{" "}
        {cart
          ? Object.values(cart).reduce(
              (acc, category) => acc + category.length,
              0
            )
          : 0}
      </p>

      <div>
        <button style={{ border: "1px solid red" }}>Check out</button>
      </div>
    </div>
  );
};

export default CartPage;
