'use client'

import { useState } from 'react';
import { 
  Bars3Icon, 
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext';

const AdminHeader = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <button className="text-gray-500 hover:text-gray-600 lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className={`h-5 w-5 ${
                isSearchFocused ? 'text-blue-500' : 'text-gray-400'
              }`} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`block w-full pl-10 pr-3 py-2 border ${
                isSearchFocused ? 'border-blue-500' : 'border-gray-300'
              } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm`}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-500">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + user?.displayName}
                alt={user?.displayName || 'User'}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {user?.displayName || 'Admin User'}
              </p>
              <p className="text-xs font-medium text-gray-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
