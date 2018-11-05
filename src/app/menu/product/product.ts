export interface Product {
  id: number;
  name: string;
  description: string;
  images: {
    full_size: string;
    thumbnail: string;
  };
  price: number;
}
