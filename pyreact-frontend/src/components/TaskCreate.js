// To start, I'm importing React and Axios modules.
import React, { useState } from 'react';
import axios from 'axios';

// This is my TaskCreate functional component.
function TaskCreate() {
  // I've set up state for each piece of task data I'll need.
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  // When the user submits the form, this function will run.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // I'm making a POST request to the server to create a new task with the data the user entered.
      await axios.post('http://localhost:5000/tasks', { title, description, dueDate, priority });
      // If the task is created successfully, I could do something with the response here.
    } catch (error) {
      // If there's an error, I'll handle it here.
    }
  };

  // I'm returning a simple form for the user to create a new task. Each input corresponds to a piece of state, and when the user types into an input, the corresponding state is updated.
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <input type="number" value={priority} onChange={e => setPriority(e.target.value)} placeholder="Priority" />
      <button type="submit">Create Task</button>
    </form>
  );
}

// Finally, I'm exporting the TaskCreate component so it can be used in other parts of my app.
export default TaskCreate;
