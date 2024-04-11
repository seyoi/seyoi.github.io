"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/contexts/CartContext";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../my-page/FirebaseAppConfig";
import AddReview from "@/app/components/review/AddReview";
import ShowReviews from "@/app/components/review/ShowReviews";
const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("slug", "==", params.slug)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProduct(doc.data());
          //   console.log(doc.id);
        });
      } catch (error) {
        console.error("Error fetching product: ", error);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Link href="/">Back to Products</Link>
      </div>
    );
  }
  return (
    <div>
      <div className="back">
        <Link href="/" style={{ border: "1px solid red" }}>
          Back to Product
        </Link>
      </div>
      <div className="content">
        <img alt={product.name} src={product.image} width={300} height={300} />
        <p>{product?.name ?? "no name"}</p>
        <p>{product.price} USD</p>
        <p>Description: {product.desc}</p>
        <div className="status">
          <div className="stock">
            {product.countInStock > 0
              ? `${product.countInStock} stock available`
              : "no stock"}
          </div>
          <button
            onClick={() => addToCart(product)}
            style={{ border: "1px solid red" }}
          >
            Add to Cart
          </button>
          <AddReview slug={params.slug} />
          <ShowReviews slug={params.slug} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
