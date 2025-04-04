import React, { useContext } from 'react';
import './Mainpage.css';
import { assets } from '../../assets/assets';
import { Context } from '../context/Context';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Mainpage = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Mainpage - Current user:', user);

  if (!user) {
    console.log('No user detected, redirecting to /login');
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    console.log('Logout clicked');
    const success = await logout();
    if (success) {
      console.log('Logout successful, navigating to /login');
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>ChatBot</p>
        <div>
          <span>Welcome, {user.username}</span>
          <img src={assets.user_icon} alt="User" />
          <button onClick={handleLogout}>Logout</button> {/* Removed inline style */}
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {user.username}.</span>
              </p>
              <p>How can I assist you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a Prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="Gallery" />
              <img src={assets.mic_icon} alt="Mic" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Chatbot may display inaccurate info, including about people, so double-check the responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;