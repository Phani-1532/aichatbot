import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext'; // Import AuthProvider, not useAuth
import Sidebar from './components/sidebar/Sidebar';
import Mainpage from './components/Main/Mainpage';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <Router>
        <Routes>
          {/* Main app route with Sidebar and Mainpage */}
          <Route
            path="/"
            element={
              <>
                <Sidebar />
                <Mainpage />
              </>
            }
          />
          {/* Login route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;