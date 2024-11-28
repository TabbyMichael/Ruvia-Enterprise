export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  // Additional fields for e-commerce
  sku?: string;
  brand?: string;
  tags?: string[];
  isActive?: boolean;
  discountPrice?: number;
  variations?: ProductVariation[];
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
