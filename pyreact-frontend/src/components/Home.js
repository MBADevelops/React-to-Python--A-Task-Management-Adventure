// I'm importing React module.
import React from 'react';

// This is the Home component, which is displayed when the user navigates to the root URL.
function Home() {
  // I've put together a simple page layout using Bootstrap classes.
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to Task Master!</h1>
        <p className="lead">Built with Python & React, this is a simple task manager application to help you manage your day-to-day tasks.</p>
        <hr className="my-4" />
        <p>Click the button below to register or log in if you already have an account.</p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a>
          <a className="btn btn-danger btn-lg ml-2" href="/register" role="button">Register</a>
        </p>
      </div>
    </div>
  );
}

// I'm exporting the Home component so it can be used in other parts of my app.
export default Home;
