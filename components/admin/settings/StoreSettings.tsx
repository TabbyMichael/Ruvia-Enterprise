'use client'

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function StoreSettings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Store Information</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">
                Store Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="store-name"
                  id="store-name"
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="Ruvia Enterprise"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Store Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="Your premier destination for quality uniforms and accessories."
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Support Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="support@ruviaenterprise.com"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Support Phone
              </label>
              <div className="mt-1">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="+254 123 456 789"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Store Address
              </label>
              <div className="mt-1">
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="123 Business Street&#10;Nairobi, Kenya"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Store Logo</label>
              <div className="mt-1 flex items-center">
                <div className="h-32 w-32 overflow-hidden rounded border border-gray-300">
                  <div className="flex h-full w-full items-center justify-center bg-gray-50">
                    <PhotoIcon className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-5 rounded border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Change Logo
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Business Hours</h3>
          <div className="mt-6 space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="w-24 text-sm font-medium text-gray-700">{day}</span>
                  <select className="rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                  </select>
                  <span className="text-gray-500">to</span>
                  <select className="rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                    <option>7:00 PM</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    defaultChecked={day !== 'Sunday'}
                  />
                  <label className="ml-2 text-sm text-gray-700">Open</label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center rounded border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
