import './index.css';
import FormBuilder from './FormBuilder';

function App() {
  const formBuilder = new FormBuilder('user-profile-form');

  const UserProfileForm = formBuilder
    .addTextField('username', 'Username', 'john.doe')
    .addTextField('email', 'Email Address')
    .addSelectField('department', 'Department', [
      { value: 'eng', label: 'Engineering' },
      { value: 'hr', label: 'Human Resources' },
      { value: 'mktg', label: 'Marketing' },
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
