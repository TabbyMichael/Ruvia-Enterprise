import { Timestamp } from 'firebase/firestore';

export interface ProductStock {
  [color: string]: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: ProductStock;
  images: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  // Additional fields for e-commerce
  sku?: string;
  brand?: string;
  tags?: string[];
  isActive?: boolean;
  discountPrice?: number;
  sizes?: string[];
  colors?: string[];
  featured?: boolean;
}

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku?: string;
}
