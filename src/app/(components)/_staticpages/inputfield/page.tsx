import { FormikProps } from "formik";

type InputFieldProps<T> = {
  label: string;
  name: keyof T;
  type?: string;
  formik: FormikProps<T>;
};

export default function InputField<T>({ label, name, type = "text", formik }: InputFieldProps<T>) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name as string}
        placeholder={`Enter your ${String(name)}`}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={String(formik.values[name] ?? "")}
        className="w-full border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-sm text-red-500 mt-1">
          {typeof formik.errors[name] === "string" ? formik.errors[name] : JSON.stringify(formik.errors[name])}
        </p>
      )}
    </div>
  );
}
