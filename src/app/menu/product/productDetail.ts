export interface ProductDetail {
  id: number;
  name: string;
  price: number;
  before_sale_price: number;
  description: string;
  full_description: string;
  order: number;
  category: {
    id: number;
    name: string;
  };
  images: {
    full_size: URL;
    thumbnail: URL;
  };
  extras: {
    id: number;
    name: string;
    min: number;
    max: number;
    items: {
      id: number;
      name: string;
      extra_id: number;
      price: number
    }[];
  }[];
  tags: string[];
  availability: string;
}
