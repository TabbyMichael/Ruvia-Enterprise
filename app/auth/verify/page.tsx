'use client';

import { useState } from 'react';

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for verification logic
    console.log('Verification code submitted:', verificationCode);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Verification Code</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="verificationCode" className="sr-only">Verification Code</label>
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter your code"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}
