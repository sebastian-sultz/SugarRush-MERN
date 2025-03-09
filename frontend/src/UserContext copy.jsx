// src/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null); // Add state for JWT token

  // Check for user data and token in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const storedToken = localStorage.getItem('token'); // Check for token in localStorage

    if (storedUser && storedToken) {
      setLoggedInUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Update localStorage and state when user logs in or out
  const updateUser = (user, newToken) => {
    setLoggedInUser(user);
    setToken(newToken);
    if (user && newToken) {
      localStorage.setItem('loggedInUser', user);
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('token');
    }
  };

  return (
    <UserContext.Provider value={{ loggedInUser, token, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUser = () => {
  return useContext(UserContext);
};