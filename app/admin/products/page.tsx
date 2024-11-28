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
    <div className="flex-1 min-w-0 flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium leading-6 text-gray-900">Products</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Product
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search products..."
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="school">School Uniforms</option>
              <option value="security">Security Uniforms</option>
              <option value="sports">Sports Uniforms</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative group bg-white border rounded-lg shadow-sm overflow-hidden">
                {/* Product image */}
                <div className="aspect-w-3 aspect-h-2">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="flex flex-col p-4">
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
                      <TrashIcon className="h-4 w-4 inline-block mr-1" />
                      Delete
                    </button>
                    <button className="flex-1 rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200">
                      <PencilIcon className="h-4 w-4 inline-block mr-1" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <ProductForm
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={fetchProducts}
        />
      )}
    </div>
  );
}
