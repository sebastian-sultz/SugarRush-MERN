import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartCount } from './utils/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0); // New state for cart count

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setLoggedInUser(storedUser);
      setToken(storedToken);
      // Fetch initial cart count on load
      fetchInitialCartCount(storedToken);
    }
  }, []);

  const fetchInitialCartCount = async (authToken) => {
    try {
      const response = await getCartCount(authToken);
      setCartCount(response.data.count || 0);
    } catch (error) {
      console.error('Error fetching initial cart count:', error);
      setCartCount(0);
    }
  };

  const updateUser = (user, newToken) => {
    setLoggedInUser(user);
    setToken(newToken);
    if (user && newToken) {
      localStorage.setItem('loggedInUser', user);
      localStorage.setItem('token', newToken);
      fetchInitialCartCount(newToken); // Fetch count on login
    } else {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('token');
      setCartCount(0); // Reset count on logout
    }
  };

  const updateCartCount = (increment = 1) => {
    setCartCount((prevCount) => prevCount + increment); // Instant local update
  };

  return (
    <UserContext.Provider value={{ loggedInUser, token, cartCount, updateUser, updateCartCount }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};