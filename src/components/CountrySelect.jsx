import React from "react";
import useStore from "../store";
import { useState } from "react";

const CountrySelect = ({ countries, onChange }) => {
  const [value, setValue] = useState("Nepal");
  const setCountry = useStore((state) => state.setFieldValue);

  const uniqueCountries = countries.map((country, index) => ({
    key: `${country}-${index}`,
    name: country,
  }));

  const handleChange = (event) => {
    setCountry("country", value);
    onChange(value);
    setValue(event.target.value);
  };

  return (
    <div className="mb-3 w-full">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        Country
      </label>
      <select
        id="country"
        value={value}
        onChange={handleChange}
        className="block w-full px-3 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {uniqueCountries.map((country) => (
          <option key={country.key} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
