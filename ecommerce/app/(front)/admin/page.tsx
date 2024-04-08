"use client";
import React, { useState } from "react";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../my-page/FirebaseAppConfig";
import { useProduct } from "@/app/contexts/ProductContext";

function Page() {
  const { productId, setProductId } = useProduct();

  const [productName, setProductName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productBrand, setProductBrand] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCountInStock, setProductCountInStock] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const registerProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: productName,
        slug: productSlug,
        category: productCategory,
        image: productImage,
        price: productPrice,
        brand: productBrand,
        desc: productDesc,
        countInStock: productCountInStock,
        rating: productRating,
        review: {
          title: reviewTitle,
          content: reviewContent,
        },
      });
      setProductId(docRef.id);
      console.log("Product written with ID: ", docRef.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Slug"
        value={productSlug}
        onChange={(e) => setProductSlug(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Category"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Image"
        value={productImage}
        onChange={(e) => setProductImage(e.target.value)}
      />
      <label htmlFor="">price</label>
      <input
        type="number"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(parseFloat(e.target.value))}
      />
      <input
        type="text"
        placeholder="Product Brand"
        value={productBrand}
        onChange={(e) => setProductBrand(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Description"
        value={productDesc}
        onChange={(e) => setProductDesc(e.target.value)}
      />
      <label htmlFor="">count in stock</label>
      <input
        type="number"
        placeholder="Product Count In Stock"
        value={productCountInStock}
        onChange={(e) => setProductCountInStock(parseInt(e.target.value))}
      />

      <button onClick={registerProduct}>Register Product</button>
    </div>
  );
}

export default Page;
