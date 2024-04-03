export type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  banner?: string;
  price: number;
  brand: string;
  desc: string;
  category: string;
  rating: number;
  numReviews: string;
  countInStock: number;
  colors?: [];
  sizes?: [];
};
