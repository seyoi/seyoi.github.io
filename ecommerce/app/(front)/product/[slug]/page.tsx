"use client";
import React, { useState } from "react";
import data from "@/app/lib/data/data";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/app/contexts/CartContext";
const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const { cart, addToCart } = useCart();

  const product = data.products.find((x) => x.slug === params.slug);
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
        <Image
          alt="1"
          src="/images/vercel.svg"
          width={300}
          height={300}
          sizes="100vw"
        />
        <p>{product?.name ?? "no name"}</p>
        <p>{product.price}</p>
        <p>{product.desc}</p>
        <div className="status">
          status
          <div className="stock">
            {product.countInStock > 0
              ? `${product.countInStock}stock available`
              : "no stock"}
          </div>
          <button
            onClick={() => addToCart(product)}
            style={{ border: "1px solid red" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
