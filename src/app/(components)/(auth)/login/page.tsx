"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/lib/features/authSlice/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import InputField from "../../_staticpages/inputfield/page";
import Link from "next/link";
import { checkedIn } from "@/lib/features/authSlice/newPassowrdSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, errorMessage, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      dispatch(loginThunk(values));
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
    dispatch(checkedIn());
  }, [isLoggedIn, router, dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Email */}
          <InputField label="Email" name="email" type="email" formik={formik} />
          {/* Password */}
          <InputField label="Password" name="password" type="password" formik={formik} />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:shadow-lg cursor-pointer duration-150 ${
              loading ? "pointer-events-none blur-xs animate-pulse" : ""
            }`}
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            Login
          </button>
          {/* Link to Forgot Password */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Do not have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                SignUp
              </Link>
            </p>
            <p className="mt-2">
              Forgot your password?{" "}
              <Link href="/forgotpassword" className="text-blue-600 hover:underline font-medium">
                Reset
              </Link>
            </p>
          </div>
          {/* Error Message */}
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
        </form>
      </div>
    </section>
  );
}
