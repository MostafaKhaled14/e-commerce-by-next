// app/cart/page.tsx
"use client";

import CartItem from "../_staticpages/cartItem/page";
import { useState } from "react";
// import { CartProduct } from "@/types";

type CartProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selected: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: 1,
      name: "Product One",
      image: "/cat1.jpg",
      price: 50,
      quantity: 2,
      selected: true,
    },
    {
      id: 2,
      name: "Product Two",
      image: "/cat2.jpg",
      price: 80,
      quantity: 2,
      selected: true,
    },
  ]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleToggleSelect = (id: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems
    .filter(item => item.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="px-6 md:px-16 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onToggleSelect={handleToggleSelect}
              onRemove={handleRemove}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="border rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <p className="mb-2 text-gray-700">Items: {cartItems.length}</p>
          <p className="mb-4 text-gray-700">
            Total: <span className="font-bold">${total.toFixed(2)}</span>
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
