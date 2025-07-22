import React from "react";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Smart Watch X1",
      category: "Electronics",
      price: 129.99,
      image: "/prod1.jpg",
      rating: 4,
      reviewsCount: 58,
      isWishlisted: true,
    },
    {
      id: 2,
      name: "Leather Shoes",
      category: "Fashion",
      price: 89.5,
      image: "/prod2.jpg",
      rating: 3,
      reviewsCount: 23,
      isWishlisted: false,
    },
    {
      id: 3,
      name: "Leather Shoes",
      category: "Fashion",
      price: 89.5,
      image: "/prod2.jpg",
      rating: 3,
      reviewsCount: 23,
      isWishlisted: false,
    },
    {
      id: 4,
      name: "Leather Shoes",
      category: "Fashion",
      price: 89.5,
      image: "/prod2.jpg",
      rating: 3,
      reviewsCount: 23,
      isWishlisted: false,
    },
    {
      id: 5,
      name: "Leather Shoes",
      category: "Fashion",
      price: 89.5,
      image: "/prod2.jpg",
      rating: 3,
      reviewsCount: 23,
      isWishlisted: false,
    },
    {
      id: 6,
      name: "Leather Shoes",
      category: "Fashion",
      price: 89.5,
      image: "/prod2.jpg",
      rating: 3,
      reviewsCount: 23,
      isWishlisted: false,
    },
  ];

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <h2 key={product.id}>hi</h2>
        ))}
      </div>
    </section>
  );
}
