'use client'

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { CreditCardIcon, BanknotesIcon, QrCodeIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function PaymentSettings() {
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState({
    mpesa: true,
    creditCard: false,
    bankTransfer: true,
  });

  return (
    <div className="space-y-6">
      {/* M-Pesa Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center">
                <QrCodeIcon className="h-8 w-8 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">M-Pesa Settings</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Configure your M-Pesa payment integration settings.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Enable M-Pesa Payments</h4>
                    <p className="text-sm text-gray-500">Allow customers to pay using M-Pesa.</p>
                  </div>
                  <Switch
                    checked={paymentMethods.mpesa}
                    onChange={(checked) => setPaymentMethods({ ...paymentMethods, mpesa: checked })}
                    className={classNames(
                      paymentMethods.mpesa ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable M-Pesa</span>
                    <span
                      className={classNames(
                        paymentMethods.mpesa ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>

                <div>
                  <label htmlFor="business-number" className="block text-sm font-medium text-gray-700">
                    Business Number (Paybill/Till)
                  </label>
                  <input
                    type="text"
                    name="business-number"
                    id="business-number"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your business number"
                  />
                </div>

                <div>
                  <label htmlFor="account-name" className="block text-sm font-medium text-gray-700">
                    Account Name
                  </label>
                  <input
                    type="text"
                    name="account-name"
                    id="account-name"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your account name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Card Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center">
                <CreditCardIcon className="h-8 w-8 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">Credit Card Settings</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Configure credit card payment options.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Enable Credit Card Payments</h4>
                    <p className="text-sm text-gray-500">Allow customers to pay using credit cards.</p>
                  </div>
                  <Switch
                    checked={paymentMethods.creditCard}
                    onChange={(checked) => setPaymentMethods({ ...paymentMethods, creditCard: checked })}
                    className={classNames(
                      paymentMethods.creditCard ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable credit card</span>
                    <span
                      className={classNames(
                        paymentMethods.creditCard ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>

                <div>
                  <label htmlFor="stripe-key" className="block text-sm font-medium text-gray-700">
                    Stripe Public Key
                  </label>
                  <input
                    type="text"
                    name="stripe-key"
                    id="stripe-key"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your Stripe public key"
                  />
                </div>

                <div>
                  <label htmlFor="stripe-secret" className="block text-sm font-medium text-gray-700">
                    Stripe Secret Key
                  </label>
                  <input
                    type="password"
                    name="stripe-secret"
                    id="stripe-secret"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your Stripe secret key"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Transfer Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center">
                <BanknotesIcon className="h-8 w-8 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">Bank Transfer Settings</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Configure bank transfer payment details.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Enable Bank Transfer</h4>
                    <p className="text-sm text-gray-500">Allow customers to pay via bank transfer.</p>
                  </div>
                  <Switch
                    checked={paymentMethods.bankTransfer}
                    onChange={(checked) => setPaymentMethods({ ...paymentMethods, bankTransfer: checked })}
                    className={classNames(
                      paymentMethods.bankTransfer ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable bank transfer</span>
                    <span
                      className={classNames(
                        paymentMethods.bankTransfer ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>

                <div>
                  <label htmlFor="bank-name" className="block text-sm font-medium text-gray-700">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bank-name"
                    id="bank-name"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="account-number"
                    id="account-number"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <label htmlFor="account-holder" className="block text-sm font-medium text-gray-700">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="account-holder"
                    id="account-holder"
                    className="mt-1 block w-full rounded border-gray-300 py-2 pl-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter account holder name"
                  />
                </div>
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
    </div>
  );
}
