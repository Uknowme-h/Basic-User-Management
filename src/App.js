import React, { useRef } from "react";
import Form from "./components/Form";
import UserTable from "./components/UserTable";

function App() {
  const userTableRef = useRef(null);

  const scrollToUserTable = () => {
    userTableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold p-4">User Management</h1>
      <div className="mb-4">
        <Form />
      </div>
      <div className="text-center mb-4">
        <button
          onClick={scrollToUserTable}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          View User Table
        </button>
      </div>
      <div ref={userTableRef} className="pt-8">
        <UserTable />
      </div>
    </div>
  );
}

export default App;
