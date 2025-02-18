import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Services/authService'; 

const Register = () => {
  // state variables to manage input fields and feedback messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  // handles the registration form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); 
    setErrorMessage('');
    setSuccessMessage('');

    // frontend validation for username and password
    if (username.length < 3) {
      setErrorMessage("Username should be at least 3 characters long.");
      return;
    }

    if (!/\d/.test(password)) {
      setErrorMessage("Password should contain at least 5 characters and one number.");
      return;
    }

    try {
    // calls the backend service for user registration
      const data = await registerUser(username, password);
      setSuccessMessage(data.message); 
      localStorage.setItem('token', data.token); 
      navigate('/'); 
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred'); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softCream px-4">
      <div className="w-full max-w-sm p-6 bg-softCream rounded-lg shadow-lg text-burntYellow md:max-w-md md:p-8">
        <h1 className="text-xl font-bold text-center mb-4 md:text-3xl md:mb-6">
          Create a new account
        </h1>

        <form onSubmit={handleRegisterSubmit} className="space-y-4 md:space-y-6">
          {/* username Input Field */}
          <div className="relative">
            <input
              type="text"
              id="registerUsername"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              className={`w-full px-3 py-2 bg-softCream text-burntYellow rounded border-2 border-softCream focus:outline-none focus:ring-2 focus:ring-burntYellow md:px-4 md:py-3 ${
                  username ? 'pt-5' : ''
              }`}
            />
            <label
              htmlFor="registerUsername"
              className={`absolute left-3 text-burntYellow top-2 text-sm md:left-4 md:top-3 md:text-base transition-all transform ${
                  username ? '-translate-y-5 scale-90' : 'translate-y-0 scale-100'
              }`}
            >
              Username
            </label>
          </div>

          {/* password Input Field */}
          <div className="relative">
            <input
              type="password"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className={`w-full px-3 py-2 bg-softCream text-burntYellow rounded border-2 border-softCream focus:outline-none focus:ring-2 focus:ring-burntYellow md:px-4 md:py-3 ${
                  password ? 'pt-5' : ''
              }`}
            />
            <label
              htmlFor="registerPassword"
              className={`absolute left-3 top-2 text-sm md:left-4 md:top-3 md:text-base text-burntYellow transition-all transform ${
                  password ? '-translate-y-5 scale-90' : 'translate-y-0 scale-100'
              }`}
            >
              Password
            </label>
          </div>

            {/* submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-burntYellow hover:bg-hoverBurntYellow text-white rounded-lg transition-all duration-200 md:py-3"
            >
              Register
            </button>
          </form>

          {/* display success or error messages */}
            {successMessage && <p className="text-oliveGreen text-xs mt-2 md:text-sm">{successMessage}</p>}
            {errorMessage && <p className="text-rustOrange text-xs mt-2 md:text-sm">{errorMessage}</p>}
      </div>
  </div>
  );
};

export default Register;
