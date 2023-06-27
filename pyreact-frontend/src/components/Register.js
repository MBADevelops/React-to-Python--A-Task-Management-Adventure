// I'm importing the necessary React and Axios modules here. The API_URL is brought in from a constants file for reusability and maintainability.
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './constants';

function Register() {
  // I'm using the useState hook to manage state in this functional component. I've set initial state for username, password, and message as empty strings.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // These are my handlers that update state when the user types into the form fields.
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // When the form is submitted, this function runs. I've made it async because I'll be making an async API call within it.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here, I'm sending a POST request to the /register endpoint on the server to create a new user with the entered username and password.
      const response = await axios.post(`${API_URL}/register`, { username, password });
      // If the registration is successful, I update the message state with a success message.
      setMessage(response.data.message);
    } catch (error) {
      // If there's an error during registration (like the user already exists), I display an error message.
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Network error. Please try again later.');
      }
    }
  };

  // Here's my component's return statement. I've created a form with inputs for username and password, and a Register button.
  // If there's a message in the state (either a success message or an error message), I display it.
  return (
    <div className="container">
      <h2 className="text-center my-4">Register</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{maxWidth: '300px'}}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input type="text" className="form-control" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit" className="btn btn-danger w-100">Register</button>
      </form>
      {message && <p className="text-center mt-3">{message}</p>}
    </div>
  );
}

// I'm exporting the Register component so I can use it in other parts of my application.
export default Register;
