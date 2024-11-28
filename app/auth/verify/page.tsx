'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const { verifyCode } = useAuth();
  const verificationId = searchParams.get('vid');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationId) {
      setError('Verification ID not found. Please try signing in again.');
      return;
    }

    try {
      await verifyCode(verificationId, verificationCode);
      // Redirect to home page after successful verification
      window.location.href = '/';
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Phone Number
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the verification code sent to your phone
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verification-code" className="sr-only">
              Verification Code
            </label>
            <input
              id="verification-code"
              name="verification-code"
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter verification code"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
