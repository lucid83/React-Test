import React from 'react';
import './App.css';
import { FormBuilder } from './FormBuilder'; // adjust path if needed

const formBuilder = new FormBuilder('testForm')
  .addTextField('username', 'Username')
  .addSelectField('role', 'Role', [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
  ])
  .addCheckbox('subscribe', 'Subscribe to newsletter', true);

const DynamicForm = formBuilder.build();

function App() {
  return (
    <>
      <h1>Terydin React Test</h1>
      <DynamicForm />
    </>
  );
}

export default App;
