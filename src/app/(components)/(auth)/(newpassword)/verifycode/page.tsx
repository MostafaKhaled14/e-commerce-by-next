"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyCode() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required").length(6, "Code must be 6 digits"),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values);
        if (data.status === "Success") {
          setMessage("Code verified! Redirecting...");
          setTimeout(() => router.push("/resetpassword"), 1500);
        }
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        setMessage(error.response?.data?.message || "Invalid or expired code");
      }
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Verify Reset Code</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Reset Code</label>
            <input
              type="text"
              name="resetCode"
              placeholder="Enter 6-digit code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.resetCode && formik.errors.resetCode && <p className="text-sm text-red-500 mt-1">{formik.errors.resetCode}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200">
            Verify Code
          </button>

          {message && (
            <p className={`text-center text-sm font-medium mb-4 ${message.includes("verified") ? "text-green-500" : "text-red-500"}`}>{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
