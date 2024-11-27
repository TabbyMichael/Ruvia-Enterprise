'use client';

import { useState } from 'react';
import { useLoadingState } from '@/hooks/useLoadingState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import GoogleButton from 'react-google-button';
import { FaPhone } from 'react-icons/fa';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

type AuthMode = 'signIn' | 'signUp' | 'phone';

// Dynamically import the AuthWrapper component with no SSR
const AuthWrapper = dynamic(
  () => import('@/components/auth/AuthWrapper'),
  { ssr: false }
);

// Client component for auth form
function AuthContent() {
  const [authMode, setAuthMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { isLoading, startLoading, stopLoading } = useLoadingState();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    try {
      if (authMode === 'signUp') {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        console.log('Sign Up', { fullName, email, password });
      } else if (authMode === 'signIn') {
        console.log('Sign In', { email, password });
      } else {
        console.log('Phone Auth', { phoneNumber });
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <AuthWrapper />
      {isLoading && <LoadingSpinner size="large" />}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          {authMode !== 'phone' ? (
            <>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  {authMode === 'signIn' 
                    ? 'Sign in to your account' 
                    : 'Create a new account'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  {authMode === 'signIn' ? (
                    <>
                      Or{' '}
                      <button 
                        onClick={() => setAuthMode('signUp')}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Create a new account
                      </button>
                    </>
                  ) : (
                    <>
                      Or{' '}
                      <button 
                        onClick={() => setAuthMode('signIn')}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Sign in to existing account
                      </button>
                    </>
                  )}
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm space-y-5">
                  {authMode === 'signUp' && (
                    <div>
                      <label htmlFor="fullName" className="sr-only">Full Name</label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Full Name"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>

                  {authMode === 'signUp' && (
                    <div>
                      <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {authMode === 'signIn' ? 'Sign In' : 'Sign Up'}
                  </button>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div>
                      <GoogleButton
                        onClick={() => console.log('Google sign-in')}
                        style={{ width: '100%', borderRadius: '0.375rem' }}
                      />
                    </div>
                    <button
                      onClick={() => setAuthMode('phone')}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <FaPhone className="h-5 w-5 text-gray-400" />
                      <span className="ml-2">Phone</span>
                    </button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <>
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in with Phone
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{' '}
                  <button
                    onClick={() => setAuthMode('signIn')}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    sign in with email
                  </button>
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <PhoneInput
                    defaultCountry="us"
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Continue with Phone
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// Main page component
export default function AuthPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <AuthContent />
    </Suspense>
  );
}