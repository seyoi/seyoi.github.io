import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/app/type/ProductModel";
function ProductItem({ product }: { product: Product }) {
  return (
    <div style={{ border: "1px solid red", marginBottom: "1rem" }}>
      <Link href={`/product/${product.slug}`}>
        <Image
          alt={product.name}
          src={product.image}
          width={300}
          height={300}
          layout={fixed}
        />
        <div className="card-body">
          <h2>{product.name}</h2>
          <p>{product.brand}</p> <span>{product.price}</span>
        </div>{" "}
      </Link>
    </div>
  );
}

export default ProductItem;
