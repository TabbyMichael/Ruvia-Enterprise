'use client'

import { useState, useEffect } from 'react';
import { Product } from '@/types/firestore';  
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import ProductForm from '@/components/admin/ProductForm';
import { getAllProducts, deleteProduct } from '@/lib/firestore';

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts();
      const productsWithId = fetchedProducts.map(product => ({
        ...product,
        id: product.id || ''  
      }));
      setProducts(productsWithId);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Products Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your product catalog, including uniforms, accessories, and more.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="mt-4 sm:flex sm:items-center sm:justify-between">
          <div className="relative mt-2 flex-1 sm:mt-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="block w-full rounded border-gray-300 py-2 pl-4 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-4 flex space-x-2 sm:ml-4 sm:mt-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${
                selectedCategory === 'all'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setSelectedCategory('school')}
              className={`rounded border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${
                selectedCategory === 'school'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              School Uniforms
            </button>
            <button
              onClick={() => setSelectedCategory('security')}
              className={`rounded border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${
                selectedCategory === 'security'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Security Uniforms
            </button>
            <button
              onClick={() => setSelectedCategory('sports')}
              className={`rounded border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${
                selectedCategory === 'sports'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sports Uniforms
            </button>
            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`rounded border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${
                selectedCategory === 'accessories'
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Accessories
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-square overflow-hidden bg-gray-200">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">KSh {product.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Stock: {Object.values(product.stock).reduce((a, b) => a + b, 0)}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 rounded-md border border-transparent bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {/* TODO: Implement edit functionality */}}
                      className="flex-1 rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <ProductForm
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
}
