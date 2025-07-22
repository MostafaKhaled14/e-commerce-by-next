"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { signupThunk } from "@/lib/features/authSlice/authSlice";
import InputField from "../../_staticpages/inputfield/page";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorMessage, isRegested } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
    if (isRegested) {
      router.push("/login");
    }
  }, [isRegested, router]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required").min(3, "Minimum 3 characters"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(/^[A-Z].{7,}$/, "Start with capital & min 8 chars")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm your password"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone")
        .required("Phone is required"),
    }),
    onSubmit: async (values) => {
      await dispatch(signupThunk(values));
    },
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Name */}
          <InputField label="Name" name="name" formik={formik} />
          {/* Email */}
          <InputField label="Email" name="email" type="email" formik={formik} />
          {/* Password */}
          <InputField label="Password" name="password" type="password" formik={formik} />
          {/* Confirm Password */}
          <InputField label="Confirm Password" name="rePassword" type="password" formik={formik} />
          {/* Phone */}
          <InputField label="Phone" name="phone" formik={formik} />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:shadow-lg cursor-pointer duration-150 ${
              loading ? "pointer-events-none blur-xs animate-pulse" : ""
            }`}
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            Sign Up
          </button>
          {/* Error Message */}
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
        </form>
      </div>
    </section>
  );
}
