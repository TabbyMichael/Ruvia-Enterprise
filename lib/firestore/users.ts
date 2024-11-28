import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { UserProfile } from '@/types/firestore';

const USERS_COLLECTION = 'users';

export async function addUser(userData: Partial<UserProfile>) {
  try {
    const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as UserProfile[];
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
}

export async function deleteUser(userId: string) {
  try {
    await deleteDoc(doc(db, USERS_COLLECTION, userId));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export async function updateUser(userId: string, userData: Partial<UserProfile>) {
  try {
    await updateDoc(doc(db, USERS_COLLECTION, userId), userData);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}
