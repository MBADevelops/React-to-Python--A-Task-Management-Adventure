// I'm importing the necessary dependencies for this component.
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../components/constants'; // This is where I keep the base API URL

// This is a functional component for the Login form.
function Login() {
  // I'm setting up state for the user's username, password, and any messages we need to display.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // This function handles changes to the username input.
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // This function handles changes to the password input.
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // This function handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // I'm making a POST request to the /login endpoint.
      const response = await axios.post(`${API_URL}/login`, { username, password });
      // On a successful login, I store the token in localStorage.
      localStorage.setItem('authToken', response.data.token);
      // I also set a success message.
      setMessage("Login successful!");
    } catch (error) {
      // If there's an error, I display the error message.
      setMessage(error.response.data.message);
    }
  };

  // In the return statement, I'm rendering a form with inputs for username and password,
  // as well as a submit button. If there's a message in state, I display it under the form.
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input 
                type="text" 
                className="form-control" 
                id="username" 
                value={username} 
                onChange={handleUsernameChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                value={password} 
                onChange={handlePasswordChange} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>
      </div>
    </div>
  );
}

// I'm exporting the Login component so it can be used elsewhere in the application.
export default Login;
