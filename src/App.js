import React from 'react';
import Form from './components/Form';
import UserTable from './components/UserTable';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Form />
      <UserTable />
    </div>
  );
}

export default App;
