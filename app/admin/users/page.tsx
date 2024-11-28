'use client'

import { useState, useEffect } from 'react';
import { getAllUsers } from '@/lib/firestore';
import { UserProfile } from '@/types/firestore';
import {
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function UsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof UserProfile>('displayName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRole, setSelectedRole] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : 1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const handleSort = (field: keyof UserProfile) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users in your account including their name, email, role and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="relative mt-2 flex-1 sm:mt-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="block w-full rounded border-gray-300 py-2.5 pl-4 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 sm:ml-4 sm:mt-0">
            <button
              onClick={() => setSelectedRole('all')}
              className={`rounded border px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none ${
                selectedRole === 'all'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Roles
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`rounded border px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none ${
                selectedRole === 'admin'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setSelectedRole('user')}
              className={`rounded border px-4 py-2.5 text-sm font-medium shadow-sm focus:outline-none ${
                selectedRole === 'user'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              User
            </button>
          </div>
        </div>

        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button
                        onClick={() => handleSort('displayName')}
                        className="group inline-flex"
                      >
                        Name
                        <span className="ml-2 flex-none rounded text-gray-400">
                          {sortField === 'displayName' ? (
                            sortDirection === 'asc' ? (
                              <ArrowUpIcon className="h-4 w-4" />
                            ) : (
                              <ArrowDownIcon className="h-4 w-4" />
                            )
                          ) : null}
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      <button
                        onClick={() => handleSort('email')}
                        className="group inline-flex"
                      >
                        Email
                        <span className="ml-2 flex-none rounded text-gray-400">
                          {sortField === 'email' ? (
                            sortDirection === 'asc' ? (
                              <ArrowUpIcon className="h-4 w-4" />
                            ) : (
                              <ArrowDownIcon className="h-4 w-4" />
                            )
                          ) : null}
                        </span>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
                            alt=""
                          />
                          <span className="ml-2">{user.displayName}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
