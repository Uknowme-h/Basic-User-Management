import React from "react";

const UserProfile = ({ user, onDelete, onEdit }) => (
  <tr>
    <td className="px-6 py-4 text-base font-medium text-gray-900">
      {user.name}
    </td>
    <td className="px-6 py-4 text-base font-medium text-gray-900">
      {user.email}
    </td>
    <td className="px-6 py-4 text-base font-medium text-gray-900">
      {user.phoneNumber}
    </td>
    <td className="px-6 py-4 text-base font-medium text-gray-900">
      {user.dob}
    </td>
    <td className="px-6 py-4 text-base font-medium text-gray-900">
      {user.city}, {user.district}, {user.province}, {user.country}
    </td>
    <td className="px-6 py-4 text-base font-medium text-gray-900">
      {user.profilePicture ? (
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      ) : (
        "No picture"
      )}
      
    </td>
    <td className="px-6 py-4 text-sm font-medium">
      <button
        onClick={onEdit}
        className="text-indigo-600 hover:text-indigo-900"
      >
        Edit
      </button>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-900 ml-2"
      >
        Delete
      </button>
    </td>
  </tr>
);

export default UserProfile;
