// I'm importing the necessary dependencies for this component.
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  // I'm setting up the state for my component.
  // tasks will store the task list, isLoading and error are used for handling the loading state and any errors.
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // I'm using the useEffect hook to fetch the tasks as soon as the component is mounted.
  useEffect(() => {
    const fetchTasks = async () => {
      // I'm setting the loading state to true before I start fetching.
      setIsLoading(true);
      try {
        // Here, I'm sending a GET request to the API to fetch the tasks.
        const response = await axios.get('http://localhost:5000/tasks');
        // If the response is successful, I update the tasks in the state and clear any errors.
        setTasks(response.data);
        setError(null);
      } catch (err) {
        // If there's an error, I set the error state with an appropriate message.
        setError('Failed to fetch tasks');
      }
      // Once the request is done, I set the loading state to false.
      setIsLoading(false);
    };

    fetchTasks();
  }, []);

  // I have some conditional rendering here. If the data is still loading, I show a loading message.
  // If there's an error, I display the error.
  // Otherwise, I map through the tasks and display each one.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

// I'm exporting the TaskList component so it can be used elsewhere in the application.
export default TaskList;
