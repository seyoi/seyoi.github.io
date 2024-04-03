// CartPage.tsx
"use client";
import { useCart } from "@/app/contexts/CartContext";

const CartPage = () => {
  const { cart } = useCart();
  const classified = [];
  cart.forEach((item) => {
    if (!classified[item.id]) {
      classified[item.id] = [];
    }
    classified[item.id].push(item);
  });

  console.log(classified);
  return (
    <div>
      <h2>Shopping Cart</h2>

      {classified.map((item, index) => (
        <div>
          {item[0].name}
          <p>{item.length}</p>
        </div>
      ))}
      <p>total: {cart.length}</p>
      <div>
        <button style={{ border: "1px solid red" }}>Check out</button>
      </div>
    </div>
  );
};

export default CartPage;
