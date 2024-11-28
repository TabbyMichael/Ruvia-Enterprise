'use client'

import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ShippingSettings() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6">
      {/* General Shipping Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">General Shipping Settings</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="processing-time" className="block text-sm font-medium text-gray-700">
                Processing Time (days)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="processing-time"
                  id="processing-time"
                  min="1"
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="2"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="free-shipping-threshold" className="block text-sm font-medium text-gray-700">
                Free Shipping Threshold (KSh)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="free-shipping-threshold"
                  id="free-shipping-threshold"
                  min="0"
                  className="block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue="5000"
                />
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

      {/* Shipping Zones */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Shipping Zones</h3>
              <p className="mt-1 text-sm text-gray-500">Define shipping rates for different regions.</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center rounded border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              Add Zone
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {/* Nairobi Zone */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-gray-900">Nairobi Metropolitan</h4>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Base Rate (KSh)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="250"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Item Rate</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estimated Days</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of Kenya Zone */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium text-gray-900">Rest of Kenya</h4>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-transparent text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Base Rate (KSh)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Item Rate</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estimated Days</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded border-gray-300 py-2 pl-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue="3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
