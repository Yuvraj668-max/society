import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure you have the correct Firebase configuration

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that provides the current user to the application
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user); // Set the current user state based on authentication state
    });
    return unsubscribe; // Cleanup subscription on component unmount
  }, []); // Empty dependency array to run only once on mount

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}  {/* Rendering children components */}
    </AuthContext.Provider>
  );
};

// PropTypes to validate 'children' prop type
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensuring 'children' is passed and is of correct type
};

