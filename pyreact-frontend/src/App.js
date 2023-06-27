// Here, I'm importing the necessary modules and components. React Router is being used for routing.
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register'; 
import Login from './components/Login';
import Logout from './components/Logout';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit'; 
import Home from './components/Home'; 
import Navbar from './components/Navbar'; 

function App() {
  // I'm wrapping my app in the Router component. Inside, I've defined various routes for the app, each one rendering a different component when it's path matches the current URL.
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/tasks/create" element={<TaskCreate />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/tasks/:id/edit" element={<TaskEdit />} />
          <Route path="/task-form" element={<TaskForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

// I'm exporting the App component so it can be used in the root index.js file.
export default App;
