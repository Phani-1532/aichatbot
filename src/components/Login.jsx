import React, { useState } from 'react';
import { useAuth } from './context/AuthContext'; // Adjust path
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Access Granted</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="futuristic-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="futuristic-input"
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="futuristic-button">
            Login
          </button>
          <p className="link-text">
            New to the system? <a href="/signup">Sign up here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;