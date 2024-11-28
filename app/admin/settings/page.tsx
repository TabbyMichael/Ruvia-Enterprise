'use client'

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { CogIcon, BuildingStorefrontIcon, TruckIcon, BellIcon, ShieldCheckIcon, SwatchIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import StoreSettings from '@/components/admin/settings/StoreSettings';
import ShippingSettings from '@/components/admin/settings/ShippingSettings';
import NotificationSettings from '@/components/admin/settings/NotificationSettings';
import SecuritySettings from '@/components/admin/settings/SecuritySettings';
import ThemeSettings from '@/components/admin/settings/ThemeSettings';
import PaymentSettings from '@/components/admin/settings/PaymentSettings';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const tabs = [
  { name: 'Store', icon: BuildingStorefrontIcon, component: StoreSettings },
  { name: 'Shipping', icon: TruckIcon, component: ShippingSettings },
  { name: 'Notifications', icon: BellIcon, component: NotificationSettings },
  { name: 'Security', icon: ShieldCheckIcon, component: SecuritySettings },
  { name: 'Theme', icon: SwatchIcon, component: ThemeSettings },
  { name: 'Payment', icon: CurrencyDollarIcon, component: PaymentSettings },
];

export default function SettingsPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your store settings, shipping, notifications, security, and more.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Tab.Group onChange={setSelectedTab}>
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8">
              {tabs.map((tab, index) => (
                <Tab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                      selected
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )
                  }
                >
                  <tab.icon
                    className={classNames(
                      'mr-2 h-5 w-5',
                      selectedTab === index ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    )}
                  />
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="mt-8">
            {tabs.map((tab, index) => (
              <Tab.Panel key={tab.name} className={classNames('space-y-8', selectedTab === index ? '' : 'hidden')}>
                <tab.component />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
