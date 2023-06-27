// I begin by importing the necessary modules to create this component.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

// Here, I'm defining the TaskEdit functional component.
const TaskEdit = () => {
  // I use React's useState hook to define local state variables to store user input and the response message.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');

  // The useParams hook allows me to access the URL parameters from a current route. Here, I use it to get the id of the task to be edited.
  const { id } = useParams();

  // With useEffect, I fetch the current task details when the component is first rendered. 
  useEffect(() => {
    axios.get(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        // Once the data is fetched, I update the form inputs to reflect the current task's details.
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDueDate(response.data.due_date);
        setPriority(response.data.priority.toString());
      })
      .catch(error => console.error('There was an error!', error));
  }, [id]); 

  // I define a function to handle the form submission. Here, I send a PUT request to the server to update the task details.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, {
        title,
        description,
        dueDate,
        priority: Number(priority)
      });
      // If the update is successful, I set a success message.
      setMessage('Task updated successfully!');
    } catch (error) {
      // If there's an error, I set an error message.
      setMessage('There was an error!');
      console.error('There was an error!', error);
    }
  };

  // Lastly, I return the JSX that forms the UI of the component.
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}
      />
      <button type="submit">Update</button>
      {message && <p>{message}</p>} 
    </form>
  );
};

// Finally, I export the TaskEdit component so it can be used in other parts of the application.
export default TaskEdit;
