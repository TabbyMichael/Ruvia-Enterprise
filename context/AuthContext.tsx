'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  sendEmailVerification,
  updateProfile,
  signInWithCredential
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined;
    recaptchaWidgetId: number | undefined;
  }
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<any>;
  verifyCode: (verificationId: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  clearRecaptcha: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearRecaptcha();
    };
  }, []);

  const clearRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = undefined;
    }
    // Remove any existing reCAPTCHA containers
    const containers = document.querySelectorAll('.recaptcha-container');
    containers.forEach(container => container.remove());
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        throw new Error('Please verify your email before signing in. Check your inbox for a verification link.');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!result.user.emailVerified) {
        throw new Error('Unable to verify Google account. Please try again.');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      clearRecaptcha(); // Clear any existing reCAPTCHA
      
      // Create a new div for reCAPTCHA
      const recaptchaContainer = document.createElement('div');
      recaptchaContainer.className = 'recaptcha-container';
      recaptchaContainer.style.display = 'none';
      document.body.appendChild(recaptchaContainer);

      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
        size: 'invisible',
        callback: () => {
          // Optional: Handle reCAPTCHA solve callback
        },
        'expired-callback': () => {
          // Optional: Handle reCAPTCHA expiration
          clearRecaptcha();
        }
      });

      const verifier = window.recaptchaVerifier;
      if (!verifier) {
        throw new Error('reCAPTCHA initialization failed');
      }

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      return confirmationResult;
    } catch (error: any) {
      clearRecaptcha();
      throw new Error(error.message);
    }
  };

  const verifyCode = async (verificationId: string, code: string) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      clearRecaptcha();
    }
  };

  const sendVerificationEmail = async () => {
    try {
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearRecaptcha();
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signInWithGoogle,
      signInWithPhone,
      verifyCode,
      logout,
      sendVerificationEmail,
      clearRecaptcha
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
