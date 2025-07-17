// components/CartItem.tsx
"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
// import { CartProduct } from "@/types";

type CartProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selected: boolean;
}

type Props = {
  item: CartProduct;
  onQuantityChange: (id: number, quantity: number) => void;
  onToggleSelect: (id: number) => void;
  onRemove: (id: number) => void;
};

export default function CartItem({
  item,
  onQuantityChange,
  onToggleSelect,
  onRemove,
}: Props) {
  const total = item.price * item.quantity;

  return (
    <div className="flex gap-4 border rounded-lg p-4 shadow hover:shadow-md duration-150 items-center">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={item.selected}
        onChange={() => onToggleSelect(item.id)}
        className="w-5 h-5 accent-blue-600"
      />

      {/* Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>

        {/* Quantity Controls */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center border rounded overflow-hidden">
            <button
              onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              className="px-2 py-1 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
            <button
              onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              className="px-2 py-1 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Price Info */}
        <div className="mt-2 text-sm text-gray-600">
          Unit Price:{" "}
          <span className="font-semibold text-blue-600">
            ${item.price.toFixed(2)}
          </span>{" "}
          | Total:{" "}
          <span className="font-semibold text-green-600">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Remove */}
      <div
        className="text-gray-500 hover:text-red-600 cursor-pointer duration-150"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 size={20} />
      </div>
    </div>
  );
}
