"use client";
import ProductItem from "@/app/components/products/ProductItem";
import data from "@/app/lib/data/data";

export default function Home() {
  return (
    <>
      <h2 className="text-2xl py-2">Lastest Product</h2>
      <div>
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </>
  );
}
