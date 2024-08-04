import React from 'react';
import useStore from '../store';

const CountrySelect = ({ countries, value, onChange }) => {
  const setCountry = useStore((state) => state.setFieldValue);

  const handleChange = (event) => {
    setCountry('.country', event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className="mb-3 w-full">
      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        Country
      </label>
      <select
        id="country"
        value={value}
        onChange={handleChange}
        className="block w-full px-3 py-2 text-base border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        {countries.map((country) => (
          <option key={country.cca3} value={country.cca3}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelect;
