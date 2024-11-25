'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-8">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex flex-col md:flex-row items-center gap-4 border-b py-6"
            >
              <div className="relative w-32 h-32 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600 mb-2">Size: {item.size}</p>
                <p className="font-semibold">
                  KSH {item.price.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, item.size, Number(e.target.value))
                  }
                  className="border rounded-md px-2 py-1"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>KSH {getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>KSH {getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700"
              onClick={() => {
                // Implement checkout functionality
                alert('Proceeding to checkout...')
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
