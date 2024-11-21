import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


// this component displays the header for the 2048 game, including a title and navigation buttons (Leaderboard and Logout).
const Header = ({ onLogout }) => {
  // hooks for managing current location, navigation, and menu state.
  const location = useLocation(); // determines the current URL path.
  const navigate = useNavigate(); // allows programmatic navigation.
  const isLeaderboardPage = location.pathname === "/leaderboard"; // checks if the user is on the Leaderboard page.
  const [isMenuOpen, setIsMenuOpen] = useState(false); // manages the state of the mobile menu.

  // handles user logout by removing login data and navigating to the home page.
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // clears login status from localStorage.
    onLogout(false); // calls the parent-provided logout handler.
    navigate("/"); // redirects to the home page.
  };

  // toggles the visibility of the mobile menu.
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // container for the header with responsive styling.
    <div className="relative flex flex-col items-center w-full p-3">
      
      {/* mobile menu button - only visible on small screens */}
      <div className="absolute top-4 left-4 md:hidden">
        <button
          onClick={toggleMenu}
          className="w-8 h-8 flex flex-col justify-center items-center gap-1"
        >
          {/* three bars representing a hamburger menu icon */}
          <span className="w-6 h-1 bg-rustOrange rounded"></span>
          <span className="w-6 h-1 bg-rustOrange rounded"></span>
          <span className="w-6 h-1 bg-rustOrange rounded"></span>
        </button>

        {/* dropdown menu for mobile view */}
        {isMenuOpen && (
          <div className="absolute top-8 left-0 bg-burntYellow shadow-lg rounded px-3">
            {/* navigation link to toggle between Leaderboard and Home */}
            <Link
              to={isLeaderboardPage ? "/" : "/leaderboard"}
              className="block font-[Poppins] px-3 py-1 text-rustOrange rounded hover:bg-hoverBurntYellow transition-all duration-200"
              onClick={() => setIsMenuOpen(false)} // closes menu after navigation.
            >
              {isLeaderboardPage ? "Go Back" : "Leaderboard"}
            </Link>
            {/* Logout button */}
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false); // closes menu after logout.
              }}
              className="block w-full text-left font-[Poppins] px-3 py-1 text-rustOrange rounded hover:bg-hoverBurntYellow transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* buttons for desktop view - only visible on medium or larger screens */}
      <div className="hidden md:flex md:flex-col md:gap-2 md:absolute md:top-32 md:right-16">
        {/* link to toggle between Leaderboard and Home */}
        <Link
          to={isLeaderboardPage ? "/" : "/leaderboard"}
          className="font-[Poppins] px-3 py-1 text-rustOrange bg-burntYellow rounded hover:bg-hoverBurntYellow transition-all duration-200 md:px-5"
        >
          {isLeaderboardPage ? "Go Back" : "Leaderboard"}
        </Link>
        {/* logout button */}
        <button
          onClick={handleLogout}
          className="font-[Poppins] px-3 py-1 text-rustOrange bg-burntYellow rounded hover:bg-hoverBurntYellow transition-all duration-200 md:px-5"
        >
          Logout
        </button>
      </div>

      {/* title of the game - "2048" */}
      <h1
        className="text-5xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-rustOrange via-burntYellow to-oliveGreen 
        animate-shimmer drop-shadow-2xl font-[Poppins] mt-4 md:absolute md:left-20 md:top-8 md:text-7xl"
      >
        2048
      </h1>
    </div>
  );
};

export default Header;
