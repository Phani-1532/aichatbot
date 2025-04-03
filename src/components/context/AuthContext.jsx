import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize with a default user and allow new users to be added
  const [users, setUsers] = useState([{ username: 'user', password: 'password' }]);
  const [user, setUser] = useState(null); // Current logged-in user

  const login = (username, password) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      return false; // User already exists
    }
    // Add new user
    const newUser = { username, password };
    setUsers([...users, newUser]);
    setUser({ username }); // Auto-login after signup
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);