// I'm importing the necessary dependencies for this component.
import React, { useState } from 'react';
import axios from 'axios';

// I'm defining a functional component for the task form.
const TaskForm = () => {
  // I'm using the useState hook to create state variables for each field in the form.
  const [title, setTitle] = useState(''); // For the task title
  const [description, setDescription] = useState(''); // For the task description
  const [dueDate, setDueDate] = useState(''); // For the task due date
  const [priority, setPriority] = useState(''); // For the task priority
  const [message, setMessage] = useState(''); // For displaying messages to the user

  // I'm defining an asynchronous function to handle the form submission.
  const handleSubmit = async (e) => {
    // I prevent the form from submitting normally to prevent a page refresh.
    e.preventDefault();
    
    try {
      // I'm making a POST request to the backend to create a new task.
      // I'm passing the form values as part of the request body.
      await axios.post('http://localhost:5000/tasks', {
        title,
        description,
        dueDate,
        priority
      });
      
      // If the request is successful, I set a success message to be displayed.
      setMessage('Task created successfully!');
    } catch (error) {
      // If there's an error, I set an error message to be displayed and log the error for debugging.
      setMessage('There was an error!');
      console.error('There was an error!', error);
    }
  };

  // In the return statement, I'm rendering the form.
  // I'm using the Bootstrap classes for styling.
  // Each form input uses a controlled component approach where the input's value is tied to the state and the onChange handler updates the state.
  // I'm also displaying any messages to the user underneath the form.
  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priority" className="form-label">Priority</label>
          <input
            type="number"
            className="form-control"
            id="priority"
            placeholder="Priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

// I'm exporting the TaskForm component to be used in other parts of the application.
export default TaskForm;
