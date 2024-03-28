export type Product = {
  id?: string;
  name: string;
  slug: string;
  image: string;
  banner?: string;
  price: number;
  brand: string;
  decription: string;
  category: string;
  rating: number;
  numReviews: string;
  countInStock: number;
  colors?: [];
  sizes?: [];
};
