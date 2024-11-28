'use client';

import { useState, useEffect } from 'react';
import { useLoadingState } from '@/hooks/useLoadingState';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Toast from '@/components/ui/Toast';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import GoogleButton from 'react-google-button';
import { FaPhone } from 'react-icons/fa';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { InformationCircleIcon, XCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

type AuthMode = 'signIn' | 'signUp' | 'phone';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoadingState();
  const router = useRouter();
  const { signIn, signUp, signInWithGoogle, signInWithPhone, user, clearRecaptcha } = useAuth();

  // Clear reCAPTCHA when component unmounts
  useEffect(() => {
    return () => {
      clearRecaptcha();
    };
  }, [clearRecaptcha]);

  // Clear reCAPTCHA when switching auth modes
  useEffect(() => {
    clearRecaptcha();
  }, [authMode, clearRecaptcha]);

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startLoading();
    
    try {
      if (authMode === 'signUp') {
        if (password !== confirmPassword) {
          showErrorToast("Passwords do not match");
          return;
        }
        await signUp(email, password, fullName);
        setShowVerificationMessage(true);
        showSuccessToast('Account created successfully! Please check your email for verification.');
      } else if (authMode === 'signIn') {
        await signIn(email, password);
        showSuccessToast('Welcome back!');
        setTimeout(() => {
          router.push('/');
        }, 1500); // Delay redirect to show the toast
      } else {
        try {
          const confirmationResult = await signInWithPhone(phoneNumber);
          if (confirmationResult?.verificationId) {
            showSuccessToast('Verification code sent!');
            setTimeout(() => {
              router.push(`/auth/verify?vid=${confirmationResult.verificationId}`);
            }, 1500);
          } else {
            throw new Error('Failed to start phone verification');
          }
        } catch (error: any) {
          showErrorToast(error.message);
          clearRecaptcha();
        }
      }
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      stopLoading();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      startLoading();
      await signInWithGoogle();
      showSuccessToast('Welcome back!');
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error: any) {
      showErrorToast(error.message);
    } finally {
      stopLoading();
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <>
      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
      
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
                  
                  <div className="relative">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {authMode === 'signUp' && (
                    <div className="relative">
                      <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {showVerificationMessage && (
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">
                          Verification Email Sent
                        </h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            Please check your email for a verification link. You need to verify your email before signing in.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

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
                        onClick={handleGoogleSignIn}
                        style={{ width: '100%', borderRadius: '0.375rem' }}
                      />
                    </div>
                    <button
                      type="button"
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

                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                          Error
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>{error}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div id="recaptcha-container"></div>

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