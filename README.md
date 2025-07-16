# React-Test

# UI Programming Test: The Dynamic Form Builder

## Rules:

- You are allowed to use AI for this test.
- The project has been setup with vite and tailwindcss.
- use any package manager of your choice (npm, pnpm, yarn, etc).

The goal of this test is to implement the **Builder design pattern** in TypeScript/JavaScript to dynamically construct and render a React form component. This test assesses the ability to separate the construction of a complex object from its representation.

---

## Part 1: Implement the `FormBuilder` (60 mins)

Create a `FormBuilder` class that has the following methods and functionality:

1.  **`constructor(formId: string)`**

    - Initializes the builder with a unique ID for the `<form>` element.

2.  **`addTextField(name: string, label: string, defaultValue?: string)`**

    - Adds a configuration for a standard text input field (`<input type="text">`).
    - It must be chainable (i.e., return `this`).

3.  **`addSelectField(name: string, label: string, options: Array<{value: string, label: string}>)`**

    - Adds a configuration for a dropdown (`<select>`). The `options` array will populate the `<option>` elements.
    - It must be chainable.

4.  **`addCheckbox(name: string, label: string, defaultChecked?: boolean)`**

    - Adds a configuration for a checkbox (`<input type="checkbox">`).
    - It must be chainable.

5.  **`build(): React.ComponentType`**
    - This is the final method. It consumes all stored configurations and returns a complete, **stateful React functional component**.
    - The returned component must:
      - Render a `<form>` element with the `formId` provided in the constructor.
      - Render all configured fields with their respective labels.
      - Manage the state of all its input fields internally using React Hooks.
      - Upon form submission, it must prevent the default browser refresh, gather all current form values into a single object, and `console.log` this object.

---

## Part 2: Usage Example (Demonstration)

Your `FormBuilder` implementation should work correctly with the following usage code. Include this or a similar example in your solution to demonstrate that your builder works.

**`App.js`**

```javascript
import React from "react";
import FormBuilder from "./FormBuilder"; // Your implementation

// 1. Create a builder instance and configure the form
const registrationFormBuilder = new FormBuilder("register-form")
  .addTextField("username", "Username", "john.doe")
  .addTextField("email", "Email Address")
  .addSelectField("department", "Department", [
    { value: "eng", label: "Engineering" },
    { value: "hr", label: "Human Resources" },
    { value: "mktg", label: "Marketing" },
  ])
  .addCheckbox("terms", "I agree to the terms and conditions");

// 2. Build the React component from the builder
const RegistrationForm = registrationFormBuilder.build();

// 3. Render the component
function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <header>
        <h1>User Registration</h1>
        <p>This form was generated using the Builder pattern.</p>
      </header>
      <main>
        <RegistrationForm />
      </main>
    </div>
  );
}

export default App;
```
