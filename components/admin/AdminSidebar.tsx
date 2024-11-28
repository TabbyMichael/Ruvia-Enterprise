'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  CogIcon, 
  SunIcon, 
  MoonIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

const AdminSidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const { signOut } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // TODO: Implement dark mode functionality
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-800">Ruvia Admin</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-blue-600' : 'text-gray-400'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <button
              onClick={toggleDarkMode}
              className="flex-1 flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
            >
              {darkMode ? (
                <SunIcon className="mr-3 h-6 w-6 text-gray-400" />
              ) : (
                <MoonIcon className="mr-3 h-6 w-6 text-gray-400" />
              )}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={signOut}
              className="flex-1 flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
            >
              <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
