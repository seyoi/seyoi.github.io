"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./my-page/FirebaseAppConfig";
import ProductItem from "../components/products/ProductItem";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = [];
        querySnapshot.forEach((doc) => {
          productsData.push(doc.data());
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products
        ? products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))
        : "no products"}
    </div>
  );
}

export default ProductPage;
