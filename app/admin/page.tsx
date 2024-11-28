'use client'

import { useState, useEffect } from 'react';
import { 
  ShoppingBagIcon, 
  CurrencyDollarIcon, 
  TagIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { getAllProducts } from '@/lib/firestore';
import { Product } from '@/types/product';

const StatCard = ({ title, value, icon: Icon, bgColor }: {
  title: string;
  value: string | number;
  icon: any;
  bgColor: string;
}) => (
  <div className={`${bgColor} rounded-lg shadow-lg p-6`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white text-sm font-medium">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
      <Icon className="h-8 w-8 text-white opacity-80" />
    </div>
  </div>
);

const RecentProductsTable = ({ products }: { products: Product[] }) => (
  <div className="mt-8 flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={product.imageUrl || '/placeholder.png'}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      KSh {product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-600">
          Monitor your store's performance and manage products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={TagIcon}
          bgColor="bg-blue-600"
        />
        <StatCard
          title="Active Orders"
          value="24"
          icon={ShoppingBagIcon}
          bgColor="bg-green-600"
        />
        <StatCard
          title="Today's Revenue"
          value={`KSh ${products.reduce((acc, product) => acc + product.price, 0).toFixed(2)}`}
          icon={CurrencyDollarIcon}
          bgColor="bg-purple-600"
        />
        <StatCard
          title="Pending Shipments"
          value="12"
          icon={TruckIcon}
          bgColor="bg-orange-600"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Products</h2>
        <RecentProductsTable products={products} />
      </div>
    </div>
  );
}
