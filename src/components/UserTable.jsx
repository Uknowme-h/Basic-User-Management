import React, { useState } from "react";
import useStore from "../store";
import UserProfile from "./UserProfile";
import FormInput from "./FormInput";
import CountrySelect from "./CountrySelect";

const UserTable = () => {
  const { countries, deleteUser, updateUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "",
  });
  const userdata = JSON.parse(localStorage.getItem("users"));
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userdata.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userdata.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleEdit = (index) => {
    setEditingUserIndex(index);
    setEditForm(userdata[index]);
  };

  const handleEditChange = (field, value) => {
    setEditForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleSubmitEdit = () => {
    updateUser(editingUserIndex, editForm);
    setEditingUserIndex(null);
    setEditForm({
      name: "",
      email: "",
      phoneNumber: "",
      dob: "",
      city: "",
      district: "",
      province: "",
      country: "",
    });
  };

  const handleDelete = (index) => {
    deleteUser(index);
  };

  return (
    <div className="mt-5">
      {editingUserIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="space-y-4">
              <FormInput
                label="Name"
                name="name"
                type="text"
                value={editForm.name}
                onChange={(value) => handleEditChange("name", value)}
              />
              <FormInput
                label="Email"
                name="email"
                type="email"
                value={editForm.email}
                onChange={(value) => handleEditChange("email", value)}
              />
              <FormInput
                label="Phone Number"
                name="phoneNumber"
                type="text"
                value={editForm.phoneNumber}
                onChange={(value) => handleEditChange("phoneNumber", value)}
              />
              <FormInput
                label="Date of Birth"
                name="dob"
                type="date"
                value={editForm.dob}
                onChange={(value) => handleEditChange("dob", value)}
              />
              <FormInput
                label="City"
                name="city"
                type="text"
                value={editForm.city}
                onChange={(value) => handleEditChange("city", value)}
              />
              <FormInput
                label="District"
                name="district"
                type="text"
                value={editForm.district}
                onChange={(value) => handleEditChange("district", value)}
              />
              <FormInput
                label="Province"
                name="province"
                type="text"
                value={editForm.province}
                onChange={(value) => handleEditChange("province", value)}
              />
              <CountrySelect
                countries={countries}
                value={editForm.country}
                onChange={(value) => handleEditChange("country", value)}
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingUserIndex(null)}
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitEdit}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DOB
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Profile Picture
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user, index) => (
            <UserProfile
              key={index}
              user={user}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </tbody>
      </table>
      <div className="mb-4 flex items-center justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-black hover:bg-gray-50 ${
                number === currentPage ? "bg-indigo-500 text-white" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default UserTable;
