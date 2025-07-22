"use client";

import InputField from "@/app/(components)/_staticpages/inputfield/page";
import { checkedIn, verifyCodeThunk } from "@/lib/features/authSlice/newPassowrdSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, errorMessage } = useSelector((state: RootState) => state.forgot);

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(verifyCodeThunk(values)).unwrap();
        router.push("/resetpassword");
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    dispatch(checkedIn());
  }, [dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <button
          onClick={() => router.push("/forgotpassword")}
          className="px-3 py-1 mb-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Verify Reset Code</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Email */}
          <InputField label="Verify Code" name="resetCode" formik={formik} />
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:shadow-lg cursor-pointer duration-150 ${
              loading ? "pointer-events-none blur-xs animate-pulse" : ""
            }`}
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            Verify Code
          </button>
          {/* Error Message */}
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
        </form>
      </div>
    </section>
  );
}
