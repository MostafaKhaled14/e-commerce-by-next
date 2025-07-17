"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
// import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
// import ProtectedRoute from "@/app/_protectedroute/Protectedroute";
// import { cookies } from "next/headers";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/lib/features/authSlice/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import InputField from "../../_staticpages/inputfield/page";
// import { RootState } from "@reduxjs/toolkit/query";

// type LoginFormValues = {
//   email: string;
//   password: string;
// };

// type InputFieldProps = {
//   label: string;
//   name: string;
//   type?: string;
//   formik: FormikProps<LoginFormValues>;
// };

// function InputField({ label, name, type = "text", formik }: InputFieldProps) {
//   return (
//     // <ProtectedRoute>

//     <div>
//       <label className="block text-gray-700 font-medium mb-1">{label}</label>
//       <input
//         type={type}
//         name={name}
//         placeholder={`Enter your ${name}`}
//         onChange={formik.handleChange}
//         onBlur={formik.handleBlur}
//         value={formik.values[name as keyof LoginFormValues]}
//         className="w-full border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       />
//       {formik.touched[name as keyof LoginFormValues] && formik.errors[name as keyof LoginFormValues] && (
//         <p className="text-sm text-red-500 mt-1">{formik.errors[name as keyof LoginFormValues]}</p>
//       )}
//     </div>
//     // </ProtectedRoute>
//   );
// }

export default function LoginPage() {
  // const [message, setMessage] = useState("");
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const token = localStorage.getItem("token");
  const { loading , loginMessage } = useSelector((state: RootState) => state.auth);
  // const loginMessage = useSelector((state: RootState) => state.auth.loginMessage);
  // const loading = useSelector((state: RootState) => state.auth.loading);
  // const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  // localStorage.setItem("token", token ?? "");
  // console.log(localStorage.getItem("token"));



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
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Email */}
          <InputField label="Email" name="email" type="email" formik={formik} />

          {/* Password */}
          <InputField label="Password" name="password" type="password" formik={formik} />
          {/* Email */}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:shadow-lg transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            Login
          </button>

          {/* Link to Forgot Password */}
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Do nt have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </a>
            </p>
            <p className="mt-2">
              Forgot your password?{" "}
              <a href="/forgotpassword" className="text-blue-600 hover:underline font-medium">
                Reset here
              </a>
            </p>
          </div>

          {/* Message */}
          {loginMessage && (
            <p className={`${loginMessage.includes("success") ? "text-green-500" : "text-red-500"} mb-4 text-center text-sm font-medium`}>{loginMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
