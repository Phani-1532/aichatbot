import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider, facebookProvider } from '../../firebase';
import {
  signInWithPopup,
  signOut,
  GithubAuthProvider, // Add this import
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [{ username: 'user', password: 'password' }];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    localStorage.setItem('users', JSON.stringify(users));
  }, [user, users]);

  const login = (username, password) => {
    const foundUser = users.find((u) => u.username === username && u.password === password);
    if (foundUser) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    if (users.some((u) => u.username === username)) {
      return false;
    }
    const newUsers = [...users, { username, password }];
    setUsers(newUsers);
    setUser({ username });
    return true;
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const username = result.user.email.split('@')[0];
      setUser({ username });
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const username = result.user.displayName || result.user.email.split('@')[0];
      setUser({ username });
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const username = result.user.displayName || result.user.email.split('@')[0];
      setUser({ username });
    } catch (error) {
      console.error('GitHub login failed:', error);
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, googleLogin, facebookLogin, githubLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);