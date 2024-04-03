import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/app/type/ProductModel";
function ProductItem({ product }: { product: Product }) {
  return (
    <div style={{ border: "1px solid red", marginBottom: "1rem" }}>
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image alt="" src="/images/next.svg" width={300} height={300} />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={product.slug}>
          <h2>{product.name}</h2>
        </Link>
        <p>{product.brand}</p> <span>{product.price}</span>
      </div>
    </div>
  );
}

export default ProductItem;
