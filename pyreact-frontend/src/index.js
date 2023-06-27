// First, I'm importing the React module and the createRoot function from react-dom. The App component and Bootstrap styles are also imported.
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// I'm getting the root element from the HTML file.
const rootElement = document.getElementById('root');
// If the root element isn't found for some reason, I'm throwing an error.
if (!rootElement) throw new Error('Root element not found');
const root = createRoot(rootElement);

// Finally, I'm rendering the App component within React's StrictMode, which checks for potential problems in the app during the development build.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
