import { Timestamp } from 'firebase/firestore';

export interface ShippingAddress {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface UserProfile {
  displayName: string;
  email: string;
  phoneNumber: string;
  role: 'customer' | 'admin';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  shippingAddresses: ShippingAddress[];
}

export interface ProductStock {
  [size: string]: {
    [color: string]: number;
  };
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: ProductStock;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export interface Order {
  userId: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: ShippingAddress;
  totalAmount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Category {
  name: string;
  description: string;
  image: string;
  parentCategory?: string;
}
