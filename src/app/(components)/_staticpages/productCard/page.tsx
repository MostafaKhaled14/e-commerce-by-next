"use client";

// import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

type ProductCardProps = {
  id: number;
  name: string;
  category: string;
  price: number;
  // image: string;
  rating: number;
  reviewsCount: number;
  isWishlisted?: boolean;
};

export default function ProductCard({
  id,
  name,
  category,
  price,
  // image,
  rating,
  reviewsCount,
  isWishlisted = false,
}: ProductCardProps) {
  const [wishlist, setWishlist] = useState(isWishlisted);

  const handleAddToCart = () => {
    console.log("Added to cart:", id, name, price);
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
    console.log("Wishlist toggled for:", id);
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-white relative">
      <button onClick={toggleWishlist} className="absolute z-10 top-3 right-3 text-gray-400 hover:text-red-500 transition">
        <Heart size={20} className={`cursor-pointer ${wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>
      {/* Product Image */}
      <div className="h-40 bg-gray-200 rounded mb-4 relative overflow-hidden">
        {/* <Image src={image} alt={name} fill className="object-cover" /> */}
      </div>
      {/* Name */}
      <h4 className="font-semibold text-gray-700 text-base mb-1">{name.split(" ").slice(-2).join(" ")}</h4>
      {/* Category */}
      <p className="text-sm text-blue-500 mb-2">{category}</p>
      {/* Rating */}
      <div className="flex items-center text-yellow-400 text-sm mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-current" : "text-gray-300"}`} viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975h4.18c.969 0 
              1.371 1.24.588 1.81l-3.388 2.46 1.287 3.975c.3.921-.755 
              1.688-1.54 1.118L10 13.011l-3.364 2.354c-.784.57-1.838-.197-1.539-1.118l1.287-3.975-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18l1.286-3.975z"
            />
          </svg>
        ))}
        <span className="text-gray-500 ml-2 text-xs">({reviewsCount} reviews)</span>
      </div>
      {/* Price */}
      <div className="text-blue-600 font-bold mb-4 text-lg">${price.toFixed(2)}</div>
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  );
}
