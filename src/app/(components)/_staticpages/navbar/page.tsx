"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/cart", label: "Cart" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/categories", label: "Categories" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleLogoutOrRedirect = () => {
    if (token) {
      dispatch(logout());
      localStorage.removeItem("token");
      setToken(null);
      router.push("/login");
    } else {
      if (pathname === "/login") {
        router.push("/signup");
      } else {
        router.push("/login");
      }
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-2 sm:px-24 py-4 shadow-md bg-white sticky top-0 z-50">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">MyShop</Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden min-[930px]:flex items-center gap-6 text-gray-700 font-bold *:hover:text-blue-600 *:duration-150">
          {navLinks.map((link) => (
            <Link key={link.href} className={pathName === link.href ? "text-blue-600" : ""} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Icons & Account */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          {/* Cart Icon with count */}
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>}
          </div>

          {/* Account & Logout */}
          <div className="hidden min-[930px]:flex items-center gap-2 cursor-pointer">
            {token && <User onClick={() => router.push("/account")} className="w-6 h-6 text-blue-600" />}
            <div onClick={handleLogoutOrRedirect} className="bg-blue-600 text-white rounded-full px-3 py-1 hover:bg-blue-500 duration-150">
              <span>{token ? "Logout" : pathname === "/login" ? "SignUp" : "Login"}</span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => (setIsMenuOpen(!isMenuOpen), setCartCount(cartCount + 0))} className="min-[930px]:hidden focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Overlay + Mobile Menu */}
      <div className={`fixed inset-0 top-14 z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        {/* خلفية شفافة */}
        <div className="absolute inset-0" onClick={() => setIsMenuOpen(false)} />

        {/* القائمة الجانبية نفسها */}
        <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-6 space-y-4 z-50">
          <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}></button>

          {/* الروابط */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block font-bold text-gray-700 hover:text-blue-600 duration-150 ${pathName === link.href ? "text-blue-600" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Logout */}
          <div className="flex items-center gap-2 mt-6 cursor-pointer">
            <User className="w-5 h-5 text-blue-600" />
            <div className="bg-blue-600 text-white rounded-full px-3 py-1 hover:bg-blue-500 duration-150">
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
