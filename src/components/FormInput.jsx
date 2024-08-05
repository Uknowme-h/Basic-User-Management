import React from "react";

const FormInput = ({ label, name, type, errorMessage, onChange, ...props }) => (
  <div className="mb-3 w-full">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      type={type}
      id={name}
      name={name}
      className={`block w-full px-3 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
        errorMessage ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
      onChange={(e) => onChange(e.target.value)}
    />

    {errorMessage && (
      <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
    )}
  </div>
);

export default FormInput;
