import { 
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentReference,
  QueryConstraint,
  addDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile, Product, Order, Category } from '@/types/firestore';

// Users Collection Operations
export const createUserProfile = async (userId: string, userData: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  const timestamp = Timestamp.now();
  
  await setDoc(userRef, {
    ...userData,
    createdAt: timestamp,
    updatedAt: timestamp,
    role: 'customer',
    shippingAddresses: []
  });
};

export const getUserProfile = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? userSnap.data() as UserProfile : null;
};

export const updateUserProfile = async (userId: string, userData: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...userData,
    updatedAt: Timestamp.now()
  });
};

// Get all users (admin only)
export const getAllUsers = async () => {
  const usersRef = collection(db, 'users');
  const querySnapshot = await getDocs(usersRef);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as UserProfile
  }));
};

// Delete user (admin only)
export const deleteUser = async (userId: string) => {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
};

// Products Collection Operations
export const createProduct = async (productData: Partial<Product>) => {
  const productsRef = collection(db, 'products');
  const newProductRef = doc(productsRef);
  const timestamp = Timestamp.now();

  await setDoc(newProductRef, {
    ...productData,
    createdAt: timestamp,
    updatedAt: timestamp
  });

  return newProductRef.id;
};

export const getProduct = async (productId: string) => {
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);
  return productSnap.exists() ? productSnap.data() as Product : null;
};

export const updateProduct = async (productId: string, productData: Partial<Product>) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, {
    ...productData,
    updatedAt: Timestamp.now()
  });
};

export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
};

export const queryProducts = async (constraints: QueryConstraint[]) => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, ...constraints);
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Product
  }));
};

// Product Management
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<void> => {
  try {
    const productsRef = collection(db, 'products');
    await addDoc(productsRef, productData);
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProductManagement = async (productId: string, productData: Partial<Product>): Promise<void> => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      ...productData,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProductManagement = async (productId: string): Promise<void> => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Orders Collection Operations
export const createOrder = async (orderData: Partial<Order>) => {
  const ordersRef = collection(db, 'orders');
  const newOrderRef = doc(ordersRef);
  const timestamp = Timestamp.now();

  await setDoc(newOrderRef, {
    ...orderData,
    status: 'pending',
    createdAt: timestamp,
    updatedAt: timestamp
  });

  return newOrderRef.id;
};

export const getOrder = async (orderId: string) => {
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  return orderSnap.exists() ? orderSnap.data() as Order : null;
};

export const updateOrder = async (orderId: string, orderData: Partial<Order>) => {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    ...orderData,
    updatedAt: Timestamp.now()
  });
};

export const getUserOrders = async (userId: string) => {
  const ordersRef = collection(db, 'orders');
  const q = query(
    ordersRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Order
  }));
};

// Categories Collection Operations
export const createCategory = async (categoryData: Category) => {
  const categoriesRef = collection(db, 'categories');
  const newCategoryRef = doc(categoriesRef);
  await setDoc(newCategoryRef, categoryData);
  return newCategoryRef.id;
};

export const getCategory = async (categoryId: string) => {
  const categoryRef = doc(db, 'categories', categoryId);
  const categorySnap = await getDoc(categoryRef);
  return categorySnap.exists() ? categorySnap.data() as Category : null;
};

export const updateCategory = async (categoryId: string, categoryData: Partial<Category>) => {
  const categoryRef = doc(db, 'categories', categoryId);
  await updateDoc(categoryRef, categoryData);
};

export const deleteCategory = async (categoryId: string) => {
  const categoryRef = doc(db, 'categories', categoryId);
  await deleteDoc(categoryRef);
};

export const getAllCategories = async () => {
  const categoriesRef = collection(db, 'categories');
  const querySnapshot = await getDocs(categoriesRef);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() as Category
  }));
};
