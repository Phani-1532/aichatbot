import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa'; // Add FaGithub
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, googleLogin, facebookLogin, githubLogin } = useAuth();
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

  const handleGoogleSignup = () => {
    googleLogin().then(() => navigate('/'));
  };

  const handleFacebookSignup = () => {
    facebookLogin().then(() => navigate('/'));
  };

  const handleGithubSignup = () => {
    githubLogin().then(() => navigate('/'));
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="title">Enter the Future</h2>
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
          <button type="submit" className="futuristic-button">Sign Up</button>
        </form>
        <div className="social-login">
          <button className="social-button google" onClick={handleGoogleSignup}>
            <FcGoogle style={{ marginRight: '8px' }} /> Continue with Google
          </button>
          <button className="social-button facebook" onClick={handleFacebookSignup}>
            <FaFacebook style={{ marginRight: '8px' }} /> Continue with Facebook
          </button>
          <button className="social-button github" onClick={handleGithubSignup}>
            <FaGithub style={{ marginRight: '8px' }} /> Continue with GitHub
          </button>
        </div>
        <p className="link-text">
          Already synced? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;