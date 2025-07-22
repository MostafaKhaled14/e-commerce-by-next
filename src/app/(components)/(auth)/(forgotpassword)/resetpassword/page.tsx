"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import InputField from "@/app/(components)/_staticpages/inputfield/page";
import { checkedIn, resetPasswordThunk } from "@/lib/features/authSlice/newPassowrdSlice";
import { useEffect } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorMessage, passwordIsChenged } = useSelector((state: RootState) => state.forgot);

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      newPassword: Yup.string()
        .required("New Password is required")
        .matches(/^[A-Z].{7,}$/, "Start with capital & min 8 chars"),
    }),
    onSubmit: async (values) => {
      dispatch(resetPasswordThunk(values));
    },
  });

  useEffect(() => {
    if (passwordIsChenged) {
      router.push("/login");
      dispatch(checkedIn());
    }
  }, [dispatch, router, passwordIsChenged]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <button
          onClick={() => router.push("/verifycode")}
          className="px-3 py-1 mb-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Email */}
          <InputField label="Email" name="email" type="email" formik={formik} />
          {/* Password */}
          <InputField label="New Password" name="newPassword" type="password" formik={formik} />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:shadow-lg cursor-pointer duration-150 ${
              loading ? "pointer-events-none blur-xs animate-pulse" : ""
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
          <div className="text-center text-red-500">
            <p>{errorMessage}</p>
            {errorMessage === "reset code not verified" && <p>Or email is incorrect</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
