import React from 'react';
import Form from './components/Form';
import UserTable from './components/UserTable';

function App() {
  return (
    <div className="container m-auto">
      <h1 className="text-2xl font-bold p-4">User Management</h1>
      <Form />
      <UserTable />
    </div>
  );
}

export default App;
