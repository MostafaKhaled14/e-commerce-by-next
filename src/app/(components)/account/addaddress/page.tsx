"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { addAddressThunk, resetChangesFromAddressSlice } from "@/lib/features/addressSlice/addressSlice";
import InputField from "../../_staticpages/inputfield/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddAddress() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isLoadingFromAdresse, addressIsAdded, errorMessage } = useSelector((state: RootState) => state.address);

  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: Yup.object({
      city: Yup.string().required("City is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
        .required("Phone is required"),
      details: Yup.string().required("Details are required"),
    }),
    onSubmit: (values) => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";
      if (token) {
        dispatch(addAddressThunk({ values, token })).unwrap();
      }
    },
  });

  useEffect(() => {
    if (addressIsAdded) {
      dispatch(resetChangesFromAddressSlice());
    }
  }, [addressIsAdded, router, dispatch]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center px-0 sm:px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 mx-6">
        <button onClick={() => router.push("/account")} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition">
          ← Back
        </button>
        <h2 className="text-2xl font-bold my-4 text-blue-600">Add New Address</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          {/* Name */}
          <InputField label="Name" name="name" formik={formik} />
          {/* Details */}
          <div>
            <label className="block mb-1 font-medium">Details</label>
            <textarea
              name="details"
              placeholder="Enter Address Details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className="w-full border rounded p-2 resize-none"
            />
            {formik.touched.details && formik.errors.details && <div className="text-red-500 text-sm">{formik.errors.details}</div>}
          </div>
          {/* Phone */}
          <InputField label="Phone" name="phone" type="tel" formik={formik} />
          {/* City */}
          <InputField label="City" name="city" formik={formik} />
          <button
            type="submit"
            disabled={isLoadingFromAdresse}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 my-6 rounded-lg text-lg font-semibold hover:bg-blue-500 cursor-pointer duration-150
            ${isLoadingFromAdresse ? "pointer-events-none blur-xs animate-pulse" : ""}`}
          >
            {isLoadingFromAdresse ? "Adding..." : "Add Address"}
          </button>
          <div className="text-center">{errorMessage && <p className="text-red-500">{errorMessage}</p>}</div>
        </form>
      </div>
    </section>
  );
}
