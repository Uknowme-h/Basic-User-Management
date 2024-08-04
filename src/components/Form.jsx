import React, { useState, useEffect } from 'react';
import useStore from '../store';
import FormInput from './FormInput';
import CountrySelect from './CountrySelect';

const Form = () => {
  const { newUser, countries, setFieldValue, setProfilePicture, validateForm, addUser, fetchCountries, errors, isFormValid } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleInputChange = (field, value) => {
    setFieldValue(field, value);
    validateForm(); 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
    validateForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateForm();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      addUser(newUser);
      resetForm();
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFieldValue('name', '');
    setFieldValue('email', '');
    setFieldValue('phoneNumber', '');
    setFieldValue('dob', '');
    setFieldValue('city', '');
    setFieldValue('district', '');
    setFieldValue('province', '');
    setFieldValue('country', '');
    setProfilePicture(null);
    useStore.getState().resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="relative">
          <FormInput
            label="Name"
            name="name"
            type="text"
            value={newUser.name}
            onChange={(value) => handleInputChange('name', value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="relative">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={newUser.email}
            onChange={(value) => handleInputChange('email', value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="relative">
          <FormInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            value={newUser.phoneNumber}
            onChange={(value) => handleInputChange('phoneNumber', value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div className="relative">
          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            value={newUser.dob}
            onChange={(value) => handleInputChange('dob', value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <FormInput
            label="City"
            name="city"
            type="text"
            value={newUser.city}
            onChange={(value) => handleInputChange('city', value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <FormInput
            label="District"
            name="district"
            type="text"
            value={newUser.district}
            onChange={(value) => handleInputChange('district', value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="relative">
          <FormInput
            label="Province"
            name="province"
            type="text"
            value={newUser.province}
            onChange={(value) => handleInputChange('province', value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="md:col-span-2 relative">
          <CountrySelect
            countries={countries}
            value={newUser.country}
            onChange={(value) => handleInputChange('country', value)}
            className="w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="md:col-span-2 relative">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            className={`block w-full text-sm hover:cursor-pointer text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 ${errors.profilePicture ? 'border-red-500' : ''}`}
          />
          {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4 hover:cursor-pointer"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;
