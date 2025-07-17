

import ProductCard from "../_staticpages/productCard/page";

const wishlistProducts = [
  {
    id: 1,
    name: "Smartphone",
    category: "Electronics",
    image: "/cat1.jpg",
    price: 299.99,
    rating: 4.2,
    reviewsCount: 18,
    isWishlisted: true,
  },
  {
    id: 3,
    name: "Sneakers",
    category: "Fashion",
    image: "/cat4.jpg",
    price: 120,
    rating: 4.7,
    reviewsCount: 22,
    isWishlisted: true,
  },
];

export default function Wishlist() {
  return (
    <section className="px-6 md:px-16 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Wishlist</h2>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}
