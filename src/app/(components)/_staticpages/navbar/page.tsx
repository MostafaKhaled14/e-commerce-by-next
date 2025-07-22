"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [haveToken, setHaveToken] = useState(false);
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/cart", label: "Cart" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/categories", label: "Categories" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
  ];

  const handleLogoutOrRedirect = () => {
    if (haveToken) {
      dispatch(logout());
      localStorage.removeItem("token");
      setHaveToken(false);
      router.push("/login");
    } else {
      if (pathName === "/login") {
        router.push("/signup");
      } else {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setHaveToken(true);
      }
    }
  }, [isLoggedIn]);

  return (
    <>
      <nav className="flex justify-between items-center px-2 sm:px-24 py-4 shadow-md bg-gradient-to-br from-blue-100 via-white to-blue-100 sticky top-0 z-50">
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
        {/* Cart */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          <div className="relative">
            <Link href="/cart">
              <ShoppingCart className="w-7 h-7" />
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 cursor-pointer">{cartCount}</span>
            )}
          </div>
          {/* Account & Logout */}
          <div className="hidden min-[930px]:flex items-center gap-2 cursor-pointer">
            {haveToken && <User onClick={() => router.push("/account")} className="w-7 h-7 text-blue-600 hover:scale-110 duration-150" />}
            <div onClick={handleLogoutOrRedirect} className="bg-blue-600 text-white rounded-xl px-3 py-1 hover:bg-blue-500 duration-150">
              <span>{haveToken ? "Logout" : pathName === "/login" ? "SignUp" : "Login"}</span>
            </div>
          </div>
          {/* Mobile Menu */}
          <button onClick={() => (setIsMenuOpen(!isMenuOpen), setCartCount(cartCount + 0))} className="min-[930px]:hidden focus:outline-none">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Overlay*/}
        <div
          className={`fixed inset-0 top-16 z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="absolute inset-0" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-64 shadow-lg p-6 space-y-4 z-40 bg-gradient-to-br from-blue-100 via-white to-blue-100">
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}></button>
            {/* links */}
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
              <div className="bg-blue-600 text-white rounded-xl px-3 py-1 hover:bg-blue-500 duration-150">
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
