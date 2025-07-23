export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ProductDetail extends Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  images: string[];
  color: string;
  specs: string;
  reviews: string;
  weight: string;
  dimensions: string;
  colours: string;
  material: string;
}

