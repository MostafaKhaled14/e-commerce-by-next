"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetChanges, updateProfileThunk } from "@/lib/features/userSlice/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import InputField from "../../_staticpages/inputfield/page";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { userData, loading, errorMessage, profileIsUpdated } = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3, "Minimum 3 characters"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone")
        .required("Phone is required"),
    }),
    onSubmit: (values) => {
      dispatch(updateProfileThunk(values));
    },
  });

  useEffect(() => {
    if (profileIsUpdated) {
      dispatch(resetChanges());
    }
  }, [profileIsUpdated, router, dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <button onClick={() => router.push("/account")} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition">
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-blue-600 my-4">Edit Your Profile</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Current Password */}
          <InputField label="Name" name="name" type="name" formik={formik} />
          {/* Password */}
          <InputField label="Email" name="email" type="email" formik={formik} />
          {/* Confirm Password */}
          <InputField label="Phone" name="phone" type="phone" formik={formik} />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:bg-blue-500 cursor-pointer duration-150
              ${loading ? "pointer-events-none blur-xs animate-pulse" : ""}`}
          >
            {loading ? "Editing..." : "Edit Profile"}
          </button>
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
        </form>
      </div>
    </section>
  );
}
