"use client";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
import { collection, getDocs, doc } from "firebase/firestore";
import React, { createContext, useState, useContext, useEffect } from "react";

const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [rate, setRate] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [slug, setSlug] = useState(""); // 프로덕트 아이디 상태 추가
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchCountInStock = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        let totalStock = 0;
        let productId = "";
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          totalStock += productData.countInStock || 0;
          productId = doc.id;
        });
        setCountInStock(totalStock);
      } catch (error) {
        console.error("Error fetching count in stock data:", error);
      }
    };

    fetchCountInStock();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        reviews,
        setReviews,
        slug,
        setSlug,
        rate,
        setRate,
        calculatedRate,
        setCalculatedRate,
        reviewTitle,
        setReviewTitle,
        setReviewContent,
        reviewContent,
        countInStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
