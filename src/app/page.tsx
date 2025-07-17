import Link from "next/link";
import Slider from "./(components)/_staticpages/slider/page";
import CategorySlider from "./(components)/_staticpages/categorySlider/page";
import Products from "./(components)/products/page";

export default function Home() {
  return (
    <main className="px-2 sm:px-12 py-10">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MyShop</h1>
        <p className="text-lg md:text-xl mb-6">Your favorite online store for all your needs</p>
        <Link href="/products" className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </section>
      
      <Slider />

      {/* Categories Section */}
        
      <CategorySlider />

      {/* Featured Products Section */}
      {/* <section className="mt-20">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 mb-4 rounded"></div>
              <h4 className="font-semibold text-gray-700 mb-2">Product {item}</h4>
              <p className="text-gray-500 text-sm mb-2">Short description...</p>
              <span className="text-blue-600 font-bold">$99.99</span>
            </div>
          ))}
        </div>
      </section> */}
      {/* <FeaturedProducts /> */}
      
        <Products />
      
    </main>
  );
}
