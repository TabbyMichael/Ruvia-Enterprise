"use client";

import React, { useState } from 'react';

const CustomOrderPage = () => {
  const [formData, setFormData] = useState({
    product: '',
    quantity: 1,
    instructions: '',
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculatePrice = () => {
    // Example price calculation logic
    return formData.quantity * 10; // Assume each item costs $10
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Order submitted!');
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Custom Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4 p-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            placeholder="Enter product name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter any special instructions"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-indigo-600">Total Price: ${calculatePrice()}</p>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CustomOrderPage;
