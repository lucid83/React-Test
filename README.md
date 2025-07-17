# React-Test
# UI Programming Test: The Singleton Pattern

The goal of this test is to implement the **Singleton design pattern** to manage a shared, global state within a React application. This test assesses your ability to correctly implement the pattern and integrate it into React's component-based, reactive environment.

---

## Part 1: Implement the `AuthService` Singleton (60 mins)

You will create a client-side authentication service that manages the user's session state. This service must be a Singleton to ensure that all parts of the application reference the exact same instance and state.

### **1. `AuthService.ts` / `AuthService.js` Requirements:**

Create an `AuthService` class with the following specifications:

* **Singleton Implementation:**
    * The class must enforce the Singleton pattern. It should have a private constructor and a static `getInstance()` method that returns the single, shared instance of the class.

* **Internal State:**
    * The instance should hold the authentication state internally (e.g., as private properties).
        * `isAuthenticated: boolean`
        * `userProfile: object | null`

* **Public Methods:**
    * `login(username, password)`: An `async` method that simulates an API call.
        * If `username` is `"admin"` and `password` is `"password"`, it should set `isAuthenticated` to `true`, store a mock user profile (e.g., `{ name: 'Admin User', email: 'admin@example.com' }`), and resolve successfully.
        * For any other credentials, it should reject with an error.
    * `logout()`: Resets the internal state (`isAuthenticated` to `false`, `userProfile` to `null`).
    * `getAuthState()`: A synchronous method that immediately returns the current state: `{ isAuthenticated, userProfile }`.

* **Subscription Model:**
    * A critical part of integrating a non-reactive pattern into React is providing a way for components to listen for changes. Add a simple observer pattern to your Singleton:
        * `subscribe(callback)`: A method to register a listener function that will be called whenever the auth state changes.
        * `unsubscribe(callback)`: A method to remove a listener.
        * The `login()` and `logout()` methods must trigger the subscribed callbacks after the state has changed.

### **2. React Component Integration:**

Create a small React application that uses your `AuthService` Singleton to demonstrate that it works correctly. The app should have two components that interact with the *same* instance.

* **`LoginStatus` Component:**
    * This component should display the user's status.
    * On mount, it should subscribe to the `AuthService`.
    * It must display "Welcome, [User's Name]" and a "Logout" button if the user is authenticated. Clicking "Logout" should call `authService.logout()`.
    * It must display "You are not logged in." if the user is not authenticated.
    * **Crucially**, it must re-render automatically when the auth state changes (e.g., after a login attempt in another component).
    * Don't forget to `unsubscribe` when the component unmounts to prevent memory leaks.

* **`LoginForm` Component:**
    * This component should contain a simple form with "Username" and "Password" inputs and a "Login" button.
    * When the form is submitted, it should call `AuthService.getInstance().login()` with the input values and handle both successful and failed promises (e.g., by showing an alert).

**`App.js` Layout:**

Your main `App` component should render both `LoginStatus` and `LoginForm`. This setup will prove that two separate components are sharing and reacting to the state held by the single `AuthService` instance.

```javascript
// App.js
function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header>
        {/* This component will react to changes initiated by LoginForm */}
        <LoginStatus />
      </header>
      <hr style={{ margin: '20px 0' }} />
      <main>
        <LoginForm />
      </main>
    </div>
  );
}```
