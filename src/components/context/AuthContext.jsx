import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, googleProvider, facebookProvider, githubProvider } from '../../firebase';
import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser({ email: result.user.email });
      return true;
    } catch (error) {
      console.error('Manual login failed:', error);
      return false;
    }
  };

  const signup = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser({ email: result.user.email });
      return true;
    } catch (error) {
      console.error('Manual signup failed:', error);
      return false;
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser({ email: result.user.email });
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setUser({ email: result.user.email });
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  const githubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser({ email: result.user.email });
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