import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (signup(username, password)) {
      navigate('/');
    } else {
      setError('Username already exists');
    }
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="signup-box"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="title">Enter the Future</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <motion.input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="futuristic-input"
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          <div className="input-group">
            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="futuristic-input"
              whileFocus={{ scale: 1.05 }}
            />
          </div>
          {error && (
            <motion.p
              className="error-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
          <motion.button
            type="submit"
            className="futuristic-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
          <p className="link-text">
            Already synced? <a href="/login">Login here</a>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;