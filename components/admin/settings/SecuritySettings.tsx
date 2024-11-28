'use client'

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { ShieldCheckIcon, KeyIcon, LockClosedIcon } from '@heroicons/react/24/outline';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    passwordExpiry: true,
    ipRestriction: false,
  });

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center">
                <ShieldCheckIcon className="h-8 w-8 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">Two-Factor Authentication</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Add an extra layer of security to your account by requiring more than just a password to sign in.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Enable 2FA</h4>
                    <p className="text-sm text-gray-500">We'll ask for a verification code in addition to your password.</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                    className={classNames(
                      settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable 2FA</span>
                    <span
                      className={classNames(
                        settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Settings */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center">
                <KeyIcon className="h-8 w-8 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">Password Settings</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Configure password policies and requirements for your account.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Password Expiry</h4>
                    <p className="text-sm text-gray-500">Require password change every 90 days.</p>
                  </div>
                  <Switch
                    checked={settings.passwordExpiry}
                    onChange={(checked) => setSettings({ ...settings, passwordExpiry: checked })}
                    className={classNames(
                      settings.passwordExpiry ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable password expiry</span>
                    <span
                      className={classNames(
                        settings.passwordExpiry ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Security */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="flex items-center">
                <LockClosedIcon className="h-8 w-8 text-blue-500" />
                <h3 className="ml-2 text-lg font-medium leading-6 text-gray-900">Login Security</h3>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Configure additional security measures for login attempts.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">Login Notifications</h4>
                    <p className="text-sm text-gray-500">Get notified of new login attempts.</p>
                  </div>
                  <Switch
                    checked={settings.loginNotifications}
                    onChange={(checked) => setSettings({ ...settings, loginNotifications: checked })}
                    className={classNames(
                      settings.loginNotifications ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable login notifications</span>
                    <span
                      className={classNames(
                        settings.loginNotifications ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900">IP Restriction</h4>
                    <p className="text-sm text-gray-500">Restrict login attempts to specific IP addresses.</p>
                  </div>
                  <Switch
                    checked={settings.ipRestriction}
                    onChange={(checked) => setSettings({ ...settings, ipRestriction: checked })}
                    className={classNames(
                      settings.ipRestriction ? 'bg-blue-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Enable IP restriction</span>
                    <span
                      className={classNames(
                        settings.ipRestriction ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
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
