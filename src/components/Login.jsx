import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa'; // Add FaGithub
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, googleLogin, facebookLogin, githubLogin } = useAuth();
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

  const handleGoogleLogin = () => {
    googleLogin().then(() => navigate('/'));
  };

  const handleFacebookLogin = () => {
    facebookLogin().then(() => navigate('/'));
  };

  const handleGithubLogin = () => {
    githubLogin().then(() => navigate('/'));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Access granted</h2>
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
          <button type="submit" className="futuristic-button">Login</button>
        </form>
        <div className="social-login">
          <button className="social-button google" onClick={handleGoogleLogin}>
            <FcGoogle style={{ marginRight: '8px' }} /> Continue with Google
          </button>
          <button className="social-button facebook" onClick={handleFacebookLogin}>
            <FaFacebook style={{ marginRight: '8px' }} /> Continue with Facebook
          </button>
          <button className="social-button github" onClick={handleGithubLogin}>
            <FaGithub style={{ marginRight: '8px' }} /> Continue with GitHub
          </button>
        </div>
        <p className="link-text">
          New to the system? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;