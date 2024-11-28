'use client'

import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '@/lib/firestore';
import { UserProfile } from '@/types/firestore';
import {
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import UserForm from '@/components/admin/UserForm';

export default function UsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof UserProfile>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Failed to fetch users. Please try again.');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleDeleteUser = async (id: string) => {
    setDeleteUserId(id);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;
    
    setLoading(true);
    setError(null);
    try {
      await deleteUser(deleteUserId);
      setUsers(users.filter(user => user.id !== deleteUserId));
      setSuccess('User deleted successfully');
      setDeleteUserId(null);
    } catch (error) {
      setError('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const handleEditUser = (user: UserProfile) => {
    setEditUser(user);
  };

  const handleUserSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
      setSuccess('User updated successfully');
    } catch (error) {
      setError('Failed to refresh users. Please reload the page.');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium leading-6 text-gray-900">Users</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add User
            </button>
          </div>
        </div>
        <div className="mt-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">{success}</h3>
                </div>
              </div>
            </div>
          )}
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search users..."
            />
          </div>
        </div>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="relative group bg-white border rounded-lg shadow-sm overflow-hidden">
                {/* User avatar */}
                <div className="p-4">
                  <div className="flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name}
                        className="h-20 w-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* User details */}
                <div className="flex flex-col p-4 pt-0 text-center">
                  <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                  <p className="mt-1 text-xs text-gray-500">Role: {user.role}</p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="flex-1 rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      <PencilIcon className="h-4 w-4 inline-block mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex-1 rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                      <TrashIcon className="h-4 w-4 inline-block mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {(isAddModalOpen || editUser) && (
        <UserForm
          onClose={() => {
            setIsAddModalOpen(false);
            setEditUser(null);
          }}
          onSubmit={handleUserSubmit}
          user={editUser || undefined}
          mode={editUser ? 'edit' : 'create'}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Delete User</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this user? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={loading}
                  onClick={confirmDelete}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  type="button"
                  onClick={cancelDelete}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
