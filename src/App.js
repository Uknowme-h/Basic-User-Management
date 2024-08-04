import React from 'react';
import Form from './components/Form';
import UserTable from './components/UserTable';

function App() {
  return (
    <div className="container m-auto bg-[#08090A]">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Form />
      <UserTable />
    </div>
  );
}

export default App;
