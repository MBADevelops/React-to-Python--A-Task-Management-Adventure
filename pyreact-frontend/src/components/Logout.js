// I'm importing the necessary hooks for this component.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  // I'm using the useNavigate hook from react-router-dom to programmatically navigate.
  const navigate = useNavigate();

  // I'm using the useEffect hook to call a logout function as soon as the component mounts.
  useEffect(() => {
    const handleLogout = async () => {
      // Here I'm setting isAuthenticated to false.
      setIsAuthenticated(false);
      // And then navigating to the /login route.
      navigate('/login');
    };
    
    // I'm calling the handleLogout function here.
    handleLogout();
  }, [setIsAuthenticated, navigate]); // These are the dependencies for useEffect.

  // This component doesn't render anything, so I just return null.
  return null;
};

// I'm exporting the Logout component so it can be used elsewhere in the application.
export default Logout;
