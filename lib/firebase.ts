import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdruHKbDC0O9yAdEIFlJ12Fga2BM1Hscs",
  authDomain: "ruvia-e2462.firebaseapp.com",
  projectId: "ruvia-e2462",
  storageBucket: "ruvia-e2462.firebasestorage.app",
  messagingSenderId: "218130526501",
  appId: "1:218130526501:web:81fe2911930c18dafe2acc",
  measurementId: "G-YFYFDBKT4D"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, storage };
