// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import SignUpPage from './pages/SignUpPage';


function App() {
  const [userName, setUserName] = useState(null);

  const handleLogin = (name) => {
    setUserName(name);
  };

  const handleSignUp = (name) => {
    setUserName(name);
  };

  const handleLogout = () => {
    setUserName(null); // Clear userName to log out
  };

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            userName ? (
              <Navigate to="/chat" replace={true} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />

        {/* SignUp Route */}
        <Route path="/signup" element={<SignUpPage onSignUp={handleSignUp} />} />

        {/* Chat Route */}
        <Route
          path="/chat"
          element={
            userName ? (
              <ChatPage userName={userName} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Router>
  );
}

export default App;
