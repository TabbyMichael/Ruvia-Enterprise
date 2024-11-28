'use client'

import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function NotificationSettings() {
  const [loading, setLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    newOrders: true,
    orderStatus: true,
    lowStock: true,
    returns: true,
    reviews: false,
    security: true,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    newOrders: false,
    orderStatus: true,
    security: true,
  });

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Email Notifications</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your email notification preferences.</p>

          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">New Orders</h4>
                <p className="text-sm text-gray-500">Receive notifications for new orders.</p>
              </div>
              <Switch
                checked={emailNotifications.newOrders}
                onChange={(checked) => setEmailNotifications({ ...emailNotifications, newOrders: checked })}
                className={classNames(
                  emailNotifications.newOrders ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                <span className="sr-only">New order notifications</span>
                <span
                  className={classNames(
                    emailNotifications.newOrders ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Order Status Updates</h4>
                <p className="text-sm text-gray-500">Get notified when order status changes.</p>
              </div>
              <Switch
                checked={emailNotifications.orderStatus}
                onChange={(checked) => setEmailNotifications({ ...emailNotifications, orderStatus: checked })}
                className={classNames(
                  emailNotifications.orderStatus ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                <span className="sr-only">Order status notifications</span>
                <span
                  className={classNames(
                    emailNotifications.orderStatus ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Low Stock Alerts</h4>
                <p className="text-sm text-gray-500">Get notified when products are running low.</p>
              </div>
              <Switch
                checked={emailNotifications.lowStock}
                onChange={(checked) => setEmailNotifications({ ...emailNotifications, lowStock: checked })}
                className={classNames(
                  emailNotifications.lowStock ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                <span className="sr-only">Low stock notifications</span>
                <span
                  className={classNames(
                    emailNotifications.lowStock ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
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

      {/* SMS Notifications */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">SMS Notifications</h3>
          <p className="mt-1 text-sm text-gray-500">Manage your SMS notification preferences.</p>

          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">New Orders</h4>
                <p className="text-sm text-gray-500">Receive SMS alerts for new orders.</p>
              </div>
              <Switch
                checked={smsNotifications.newOrders}
                onChange={(checked) => setSmsNotifications({ ...smsNotifications, newOrders: checked })}
                className={classNames(
                  smsNotifications.newOrders ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                <span className="sr-only">New order SMS alerts</span>
                <span
                  className={classNames(
                    smsNotifications.newOrders ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Order Status Updates</h4>
                <p className="text-sm text-gray-500">Get SMS alerts for order status changes.</p>
              </div>
              <Switch
                checked={smsNotifications.orderStatus}
                onChange={(checked) => setSmsNotifications({ ...smsNotifications, orderStatus: checked })}
                className={classNames(
                  smsNotifications.orderStatus ? 'bg-blue-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                )}
              >
                <span className="sr-only">Order status SMS alerts</span>
                <span
                  className={classNames(
                    smsNotifications.orderStatus ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
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
    </div>
  );
}
