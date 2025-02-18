import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { loginUser } from '../Services/authService'; 
import { Link } from 'react-router-dom'; 

const Login = ({ onLogin }) => {
  // state to track user input for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // state for managing success and error messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // handles the form submission for login
  const handleLoginSubmit = async (e) => {
      e.preventDefault(); 
      setErrorMessage(''); 
      setSuccessMessage(''); 

      try {
          const data = await loginUser(username, password); 
          setSuccessMessage(data.message); 
          localStorage.setItem('token', data.token); 
          onLogin(); 
          navigate('/'); 
      } catch (error) {
          setErrorMessage(error.message || 'An error occurred'); 
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softCream px-4">
      <div className="w-full max-w-sm p-6 bg-softCream rounded-lg shadow-lg text-burntYellow md:max-w-md md:p-8">
        <h1 className="text-xl font-bold text-center mb-4 md:text-3xl md:mb-6">
          Login to your account
        </h1>
  
        <form onSubmit={handleLoginSubmit} className="space-y-4 md:space-y-6">
          {/* Username Field */}
          <div className="relative">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 py-2 bg-softCream text-burntYellow rounded border-2 border-softCream focus:outline-none focus:ring-2 focus:ring-burntYellow md:px-4 md:py-3 ${
                username ? 'pt-5' : ''
              }`}
            />
            <label
              htmlFor="username"
              className={`absolute left-3 text-burntYellow top-2 text-sm md:left-4 md:top-3 md:text-base transition-all transform ${
                username ? '-translate-y-5 scale-90' : 'translate-y-0 scale-100'
              }`}
            >
              Username
            </label>
          </div>
  
          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 bg-softCream text-burntYellow rounded border-2 border-softCream focus:outline-none focus:ring-2 focus:ring-burntYellow md:px-4 md:py-3 ${
                password ? 'pt-5' : ''
              }`}
            />
            <label
              htmlFor="password"
              className={`absolute left-3 top-2 text-sm md:left-4 md:top-3 md:text-base text-burntYellow transition-all transform ${
                password ? '-translate-y-5 scale-90' : 'translate-y-0 scale-100'
              }`}
            >
              Password
            </label>
          </div>
  
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-burntYellow hover:bg-hoverBurntYellow text-white rounded-lg transition-all duration-200 md:py-3"
          >
            Login
          </button>
        </form>
  
        {/* Guest Button */}
        <button
            onClick={() => {
            localStorage.setItem('guestMode', true); 
            localStorage.setItem('isLoggedIn', true); 
            onLogin(); 
            }}
            className="w-full mt-4 py-2 bg-burntYellow hover:bg-hoverBurntYellow text-white rounded-lg transition-all duration-200 md:py-3"
        >
            Play as Guest
        </button>

  
        <div className="text-center mt-3 md:mt-4">
          <p className="text-xs text-burntYellow md:text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-oliveGreen hover:underline">
              Register
            </Link>
          </p>
        </div>
  
        {successMessage && (
          <p className="text-oliveGreen text-xs mt-2 md:text-sm">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-rustOrange text-xs mt-2 md:text-sm">{errorMessage}</p>
        )}
      </div>
    </div>
  );
  
};

export default Login;
