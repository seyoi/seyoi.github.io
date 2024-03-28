import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
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
