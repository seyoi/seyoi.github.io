import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Product } from "@/lib/models/ProductModel";
function ProductItem({ product }: { product: Product }) {
  return (
    <div>
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image src="/" width={300} height={300} />
        </Link>
      </figure>
    </div>
  );
}

export default ProductItem;
