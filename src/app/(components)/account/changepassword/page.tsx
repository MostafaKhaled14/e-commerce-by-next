"use client";

import { changePasswordThunk, resetChanges } from "@/lib/features/userSlice/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import InputField from "../../_staticpages/inputfield/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorMessage, passwordIsChanged } = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/^[A-Z].{7,}$/, "Start with capital & min 8 chars")
        .required("New password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your new password"),
    }),
    onSubmit: (values) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      if (token) {
        dispatch(changePasswordThunk({ values, token }));
      }
    },
  });

  useEffect(() => {
    if (passwordIsChanged) {
      dispatch(resetChanges());
    }
  }, [passwordIsChanged, router, dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className={`w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6 ${loading ? "pointer-events-none blur-xs animate-pulse" : ""}`}>
        <button onClick={() => router.push("/account")} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition">
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-blue-600 my-4">Change Your Password</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Current Password */}
          <InputField label="Current Password" name="currentPassword" type="password" formik={formik} />
          {/* Password */}
          <InputField label="Password" name="password" type="password" formik={formik} />
          {/* Confirm Password */}
          <InputField label="Confirm Password" name="rePassword" type="password" formik={formik} />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:bg-blue-500 cursor-pointer duration-155"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
        </form>
      </div>
    </section>
  );
}
