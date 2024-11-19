import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Grid from './Components/Grid';
import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register'; 
import Leaderboard from './Components/Leaderboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'; // retrieve login state from localStorage
  });

  // sync login state with localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn || localStorage.getItem('guestMode') === 'true') {
      localStorage.setItem('isLoggedIn', 'true'); 
    } else {
      localStorage.removeItem('isLoggedIn');
    }
  }, [isLoggedIn]);
  

  // handle user logout by updating state
  const handleLogout = () => {
    setIsLoggedIn(false); 
    localStorage.removeItem('guestMode'); 
  };
  

return (
  <Router>
    <div className="bg-softCream min-h-screen">
      {/* conditionally render routes based on login status */}
      {isLoggedIn ? (
        <>
          <Header onLogout={handleLogout} /> 
          <Routes>
            <Route path="/" element={<Grid />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route 
            path="/login" 
            element={<Login onLogin={() => setIsLoggedIn(true)} />} 
          /> 
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={<Login onLogin={() => setIsLoggedIn(true)} />} 
          />
        </Routes>
      )}
    </div>
  </Router>
);
};

export default App;
