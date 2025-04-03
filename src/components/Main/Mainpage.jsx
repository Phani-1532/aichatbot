import React, { useContext } from 'react';
import './Mainpage.css';
import { assets } from '../../assets/assets';
import { Context } from '../context/Context';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Mainpage = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  const { user, logout } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="main">
      <div className="nav">
        <p>ChatBot</p>
        <div>
          <span>Welcome, {user.username}</span>
          <img src={assets.user_icon} alt="" />
          <button onClick={logout} style={{ marginLeft: '10px' }}>
            Logout
          </button>
        </div>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, {user.username}.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
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
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
            </div>
          </div>
          <p className="bottom-info">
            Chatbot may display inaccurate info, including about people, so double-check the responses. Your privacy and Chatbot Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;