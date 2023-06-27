// I'm importing the necessary dependencies for this component.
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskDetails() {
  // I'm setting up the state for my component.
  // task will store the individual task details, isLoading and error are used for handling the loading state and any errors.
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // I'm using the useParams hook from react-router-dom to get the id parameter from the URL.
  const { id } = useParams();

  // I'm using the useEffect hook to fetch the task details as soon as the component is mounted.
  useEffect(() => {
    const fetchTask = async () => {
      // I'm setting the loading state to true before I start fetching.
      setIsLoading(true);
      try {
        // Here, I'm sending a GET request to the API to fetch the task details.
        const response = await axios.get(`http://localhost:5000/tasks/${id}`);
        // If the response is successful, I update the task in the state and clear any errors.
        setTask(response.data);
        setError(null);
      } catch (err) {
        // If there's an error, I set the error state with an appropriate message.
        setError('Failed to fetch task details');
      }
      // Once the request is done, I set the loading state to false.
      setIsLoading(false);
    };

    fetchTask();
  }, [id]);

  // I have some conditional rendering here. If the data is still loading, I show a loading message.
  // If there's an error, I display the error.
  // Otherwise, I display the task details and a link to the edit page.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Task details</h2>
      {task && (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <Link to={`/tasks/${id}/edit`}>Edit</Link>
        </div>
      )}
    </div>
  );
}

// I'm exporting the TaskDetails component so it can be used elsewhere in the application.
export default TaskDetails;
