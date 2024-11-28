'use client'

import { useState } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const stats = [
  { 
    id: 1, 
    name: 'Total Revenue', 
    value: 'KSh 71,897', 
    icon: CurrencyDollarIcon, 
    change: '+14.75%', 
    changeType: 'positive',
    description: 'vs. previous period'
  },
  { 
    id: 2, 
    name: 'Product Sales', 
    value: '1,487', 
    icon: TagIcon, 
    change: '+54.02%', 
    changeType: 'positive',
    description: 'units sold'
  },
  { 
    id: 3, 
    name: 'Conversion Rate', 
    value: '3.2%', 
    icon: ArrowTrendingUpIcon, 
    change: '+0.32%', 
    changeType: 'positive',
    description: 'from total visits'
  },
  { 
    id: 4, 
    name: 'Avg. Order Value', 
    value: 'KSh 48.35', 
    icon: ShoppingBagIcon, 
    change: '+2.39%', 
    changeType: 'positive',
    description: 'per transaction'
  },
];

const topProducts = [
  {
    id: 1,
    name: 'School Uniform Set',
    sales: 245,
    revenue: 'KSh 12,250',
    growth: '+12%',
  },
  {
    id: 2,
    name: 'Sports Jersey',
    sales: 189,
    revenue: 'KSh 9,450',
    growth: '+8%',
  },
  {
    id: 3,
    name: 'School Bag',
    sales: 156,
    revenue: 'KSh 4,680',
    growth: '+15%',
  },
  {
    id: 4,
    name: 'PE Kit',
    sales: 132,
    revenue: 'KSh 3,960',
    growth: '+5%',
  },
  {
    id: 5,
    name: 'Winter Coat',
    sales: 98,
    revenue: 'KSh 4,900',
    growth: '+3%',
  },
];

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Store Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your store's performance metrics and sales analytics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <span className="text-gray-500">{stat.description}</span>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Top Selling Products</h2>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Product Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Sales
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Revenue
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Growth
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {topProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.sales}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.revenue}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-green-600">{product.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
