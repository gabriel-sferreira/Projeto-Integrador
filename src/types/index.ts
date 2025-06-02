export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  stock: number;
  featured?: boolean;
  new?: boolean;
  sale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}