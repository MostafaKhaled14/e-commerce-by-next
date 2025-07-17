"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUserData, verifyToken } from "@/lib/features/userSlice/userSlice";
import { Mail, Phone, MapPin, User } from "lucide-react";
// import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function MyAccount() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userData, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(verifyToken())
      .unwrap()
      .then(({ userId }: { userId: string }) => {
        dispatch(fetchUserData({ userId }));
      })
      .catch(() => {
        router.push("/login");
      });
  }, [dispatch, router]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="max-w-2xl mx-auto p-6 h-screen relative">
      {loading && (
        <div className="absolute inset-0 bg-black text-white opacity-40 flex justify-center items-center">
          <p>Loading...</p>
          <p className="text-red-500">{error}</p>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">🔒 My Account</h1>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
        <div className="flex items-center gap-2 text-lg">
          <User className="text-blue-600" />
          <span className="font-semibold">Name:</span> {userData?.name}
        </div>

        <div className="flex items-center gap-2 text-lg">
          <Mail className="text-blue-600" />
          <span className="font-semibold">Email:</span> {userData?.email}
        </div>

        <div className="flex items-center gap-2 text-lg">
          <Phone className="text-blue-600" />
          <span className="font-semibold">Phone:</span> {userData?.phone}
        </div>

        <div className="flex items-start gap-2 text-lg">
          <MapPin className="text-blue-600 mt-1" />
          <span className="font-semibold">Addresses:</span>{" "}
          {userData?.addresses && userData.addresses.length > 0 ? (
            <ul className="list-disc ml-5">
              {userData.addresses.map((address: string, index: number) => (
                <li key={index}>{address}</li>
              ))}
            </ul>
          ) : (
            "No saved addresses"
          )}
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <button
            onClick={() => router.push("/account/editprofile")}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() => router.push("/account/changepassword")}
            className="w-full border border-blue-600 text-blue-600 font-medium py-2 px-4 rounded hover:bg-blue-50 transition"
          >
            🔐 Change Password
          </button>
        </div>
      </div>
    </section>
  );
}
