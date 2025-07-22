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
      <Products />
    </main>
  );
}
