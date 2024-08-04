import React, { useState } from 'react';
import useStore from '../store';
import UserProfile from './UserProfile';

const UserTable = () => {
  const { users, deleteUser, updateUser } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phoneNumber: '', dob: '', city: '', district: '', province: '', country: ''  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleEdit = (index) => {
    setEditingUserIndex(index);
    setEditForm(users[index]);
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
    setEditForm({ name: '', email: '', phoneNumber: '', dob: '',  city: '', district: '', province: '', country: ''  });
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={editForm.phoneNumber}
                  onChange={(e) => handleEditChange('phoneNumber', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={editForm.dob}
                  onChange={(e) => handleEditChange('dob', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) => handleEditChange('city', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input
                  type="text"
                  value={editForm.district}
                  onChange={(e) => handleEditChange('district', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Province</label>
                <input
                  type="text"
                  value={editForm.province}
                  onChange={(e) => handleEditChange('province', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  value={editForm.country}
                  onChange={(e) => handleEditChange('country', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
      <div className="mt-4">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium border border-gray-300 bg-white text-black hover:bg-gray-50 ${number === currentPage ? 'bg-indigo-500 text-white' : ''}`}
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
