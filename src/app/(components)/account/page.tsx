"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUserDataThunk, resetChanges, verifyTokenThunk } from "@/lib/features/userSlice/userSlice";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { deleteAddressThunk, resetChangesFromAddressSlice } from "@/lib/features/addressSlice/addressSlice";

export default function Account() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userData, loading } = useSelector((state: RootState) => state.user);
  const { userAddresses, isLoadingFromAdresse, errorMessage } = useSelector((state: RootState) => state.address);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  let addresses;
  if (userAddresses.length > 0) {
    addresses = userAddresses;
  } else {
    addresses = userData?.addresses;
  }

  function deleteAddress(addressId: string, token: string) {
    dispatch(deleteAddressThunk({ addressId, token }));
    dispatch(resetChangesFromAddressSlice());
  }

  useEffect(() => {
    if (token) {
      dispatch(resetChanges());
      dispatch(resetChangesFromAddressSlice());
      dispatch(verifyTokenThunk(token))
        .unwrap()
        .then(({ userId }: { userId: string }) => {
          dispatch(fetchUserDataThunk({ userId }));
        })
        .catch(() => {
          router.push("/login");
        });
    }
  }, [token, dispatch, router]);

  return (
    <section className="max-w-2xl mx-auto p-6 min-h-screen relative">
      <div
        className={`relative bg-white rounded-xl shadow-md p-6 space-y-5 overflow-hidden ${
          loading ? "pointer-events-none blur-xs animate-pulse" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-8 text-blue-600">🔒 My Account</h1>
        <div className="flex items-center gap-2 text-xs sm:text-xl">
          <User className="text-blue-500" />
          <span className="font-semibold">Name:</span> {userData?.name}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-xl">
          <Mail className="text-blue-500" />
          <span className="font-semibold">Email:</span> {userData?.email}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-xl">
          <Phone className="text-blue-500" />
          <span className="font-semibold">Phone:</span> {userData?.phone}
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-start gap-2 text-xs sm:text-xl">
            <MapPin className="text-blue-500" />
            <span className="font-semibold">Addresses:</span>
          </div>
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
          <div>
            {addresses && addresses.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {addresses.map((address) => (
                  <li
                    key={address._id}
                    className={`bg-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center ${
                      isLoadingFromAdresse ? "pointer-events-none blur-xs animate-pulse" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-blue-600">{address.name}</p>
                      <p className="text-sm text-gray-700">
                        {address.details}, {address.city}
                      </p>
                      <p className="text-sm text-gray-700">Phone: {address.phone}</p>
                    </div>
                    <div>
                      <button onClick={() => deleteAddress(address._id, token || "")} className="text-red-600 hover:underline text-sm cursor-pointer">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ml-8 text-gray-600">No saved addresses</p>
            )}
            <div className="mt-8">
              <button
                onClick={() => router.push("/account/addaddress")}
                className="text-blue-600 border border-blue-600 px-4 py-2 w-full font-medium rounded-xl hover:bg-blue-50 duration-150 cursor-pointer"
              >
                ➕ Add New Address
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 pt-4">
          <button
            onClick={() => router.push("/account/editprofile")}
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-500 duration-150 cursor-pointer"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={() => router.push("/account/changepassword")}
            className="w-full text-white bg-blue-600 font-medium py-2 px-4 rounded-xl hover:bg-blue-500 duration-150 cursor-pointer"
          >
            🔐 Change Password
          </button>
        </div>
      </div>
    </section>
  );
}
