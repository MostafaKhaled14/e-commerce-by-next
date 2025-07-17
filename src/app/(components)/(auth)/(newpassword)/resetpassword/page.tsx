"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      newPassword: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/^[A-Z][a-z0-9@]{7,}$/, "Start with capital & min 8 chars")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values);
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.email && formik.errors.email && <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.newPassword && formik.errors.newPassword && <p className="text-sm text-red-500 mt-1">{formik.errors.newPassword}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200">
            Reset Password
          </button>

          {message && (
            <p className={`text-center text-sm mb-4 font-medium ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
