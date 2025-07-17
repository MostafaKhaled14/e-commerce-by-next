import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-white py-10 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo + Description */}
        <div>
          <Link className="text-2xl font-bold mb-2 text-blue-400" href="/">MyShop</Link>
          <p className="text-sm text-gray-300">
            Your one-stop online shop for the latest and greatest products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-blue-300">Quick Links</h3>
          <ul className="space-y-2 text-sm *:hover:text-blue-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/brands">Brands</Link></li>
            <li><Link href="/categories">Categories</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 text-blue-300">Contact Us</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@myshop.com</li>
            <li>Phone: +123 456 789</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold mb-3 text-blue-300">Follow Us</h3>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-500" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-sky-400" />
            <Mail className="w-5 h-5 cursor-pointer hover:text-emerald-400" />
          </div>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>

    </>
  )
}
