// First, I import the required modules.
import React from 'react';
import { Link } from 'react-router-dom';

// Here, I'm defining the Navbar functional component.
function Navbar() {
  // I return JSX to render the Navbar. The Link component from 'react-router-dom' is used to create navigational links in my app.
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/register">Register</Link> | 
      <Link to="/task-form">Task Form</Link>
    </nav>
  );
}

// Finally, I export the Navbar component so it can be used in other parts of my application.
export default Navbar;
