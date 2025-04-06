import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { Context } from '../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showActivity, setShowActivity] = useState(false); // State for Activity panel
  const [showSettings, setShowSettings] = useState(false); // State for Settings panel
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  // Help functionality: Show an alert with a help message
  const handleHelp = () => {
    alert(
      'Welcome to the ChatBot Help!\n\n- Type a prompt in the input box to ask questions.\n- Click "New Chat" to start a fresh conversation.\n- Use the sidebar to revisit recent prompts.\n\nMore features coming soon!'
    );
  };

  // Activity functionality: Toggle a list of recent prompts
  const handleActivity = () => {
    setShowActivity(!showActivity);
    setShowSettings(false); // Close settings if open
    console.log('Activity toggled:', prevPrompts);
  };

  // Settings functionality: Toggle a placeholder settings panel
  const handleSettings = () => {
    setShowSettings(!showSettings);
    setShowActivity(false); // Close activity if open
    console.log('Settings toggled');
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu"
        />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="New Chat" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className="recent-entry"
              >
                <img src={assets.message_icon} alt="Message" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div onClick={handleHelp} className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="Help" />
          {extended ? <p>Help</p> : null}
        </div>
        <div onClick={handleActivity} className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="Activity" />
          {extended ? <p>Activity</p> : null}
        </div>
        {/* Activity panel (simple inline version) */}
        {showActivity && extended && (
          <div className="activity-panel">
            <p className="panel-title">Recent Activity</p>
            {prevPrompts.length > 0 ? (
              prevPrompts.slice(0, 3).map((item, index) => (
                <p key={index} className="activity-item">
                  {item.slice(0, 18)}...
                </p>
              ))
            ) : (
              <p>No recent activity</p>
            )}
          </div>
        )}
        <div onClick={handleSettings} className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="Settings" />
          {extended ? <p>Settings</p> : null}
        </div>
        {/* Settings panel (simple inline version) */}
        {showSettings && extended && (
          <div className="settings-panel">
            <p className="panel-title">Settings</p>
            <p>Theme: Futuristic (default)</p>
            <button onClick={() => console.log('Toggle theme placeholder')}>
              Toggle Theme
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;