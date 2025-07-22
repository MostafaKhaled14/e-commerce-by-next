// "use client";

const products = [
  {
    id: 1,
    name: "Smartphone",
    category: "Electronics",
    // image: "/public/file.svg",
    price: 299.99,
    rating: 4.2,
    reviews: 18,
  },
  {
    id: 2,
    name: "Headphones",
    category: "Audio",
    // image: "/cat2.jpg",
    price: 89.5,
    rating: 3.8,
    reviews: 9,
  },
  {
    id: 3,
    name: "Smartwatch",
    category: "Wearables",
    // image: "/cat3.jpg",
    price: 199.99,
    rating: 4.5,
    reviews: 25,
  },
  {
    id: 4,
    name: "Laptop",
    category: "Computers",
    // image: "/cat4.jpg",
    price: 999.99,
    rating: 4.8,
    reviews: 30,
  },
];

export default async function Products() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <h2 key={prod.id}>{prod.name}</h2>
        ))}
      </div>
    </section>
  );
}
