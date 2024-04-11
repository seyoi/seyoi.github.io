"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/app/type/ProductModel";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db, auth } from "../(front)/my-page/FirebaseAppConfig";
import { useAuth } from "./AuthContext";

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
};
const CartContext = createContext<CartContextType>({
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
  const [cart, setCart] = useState<Product[]>([]);

  const { userState } = useAuth();
  useEffect(() => {
    const loadCartData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const cartCollectionRef = collection(db, "users", userId, "cart");
          const querySnapshot = await getDocs(cartCollectionRef);

          const items = querySnapshot.docs.map((doc) => doc.data());

          const groupedItem = items.reduce((acc, item) => {
            const key = item.name;
            if (!key) {
              return acc;
            }
            acc[key] = acc[key] || [];
            acc[key].push(item);
            return acc;
          }, []);
          setCart(groupedItem);
        }
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    };

    loadCartData();
  }, [userState]);

  const addToCart = async (product: Product) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userId = user.uid;
        const newItem = product;

        const cartCollectionRef = collection(db, "users", userId, "cart");
        await addDoc(cartCollectionRef, newItem);

        setCart((prevCart: Product[]) => [...prevCart, newItem]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
