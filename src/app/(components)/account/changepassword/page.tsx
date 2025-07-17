"use client";
import { changePasswordThunk } from "@/lib/features/userSlice/userSlice";
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
  const { loading, error, successMessage, passwordIsChanged } = useSelector((state: RootState) => state.user);

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
        .matches(/^[A-Z][a-z0-9@]{7,}$/, "Start with capital letter")
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
      router.push("/account");
    }
  }, [passwordIsChanged, router]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
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
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 my-6 rounded-lg text-lg font-semibold transition duration-200 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-500"
            }`}
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
          <div className="text-center">
            {successMessage === "Password changed successfully" ? (
              <p className="text-green-600">{successMessage}</p>
            ) : (
              <p className="text-red-500">{error}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
