import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FormBuilder from './FormBuilder';

function App() {
  const formBuilder = new FormBuilder('user-profile-form');

  const UserProfileForm = formBuilder
    .addTextField('firstName', 'First Name', 'John')
    .addTextField('lastName', 'Last Name', 'Doe')
    .addSelectField('country', 'Country', [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
    ])
    .addCheckbox('newsletter', 'Subscribe to newsletter', true)
    .addCheckbox('terms', 'I agree to terms and conditions', false)
    .build();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <UserProfileForm />
    </div>
  );
}

export default App;
