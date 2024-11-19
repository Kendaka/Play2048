import React, { useState, useEffect } from 'react';
import { fetchLeaderboard } from '../Services/authService'; // importing the service to fetch leaderboard data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faMedal } from '@fortawesome/free-solid-svg-icons'; 

const Leaderboard = () => {
  // state for storing the top scores
  const [topScores, setTopScores] = useState([]);
  // state to track if data is loading
  const [loading, setLoading] = useState(true);
  // state to track error messages
  const [error, setError] = useState('');

  // fetch the leaderboard data when the component mounts
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = await fetchLeaderboard(); // fetch data from the backend
        setTopScores(data); // update the state with the fetched scores
        setLoading(false); // set loading to false once data is fetched
      } catch (error) {
        console.error(error); // log the error for debugging
        setError('There was an issue loading the leaderboard. Please try again later.'); // set an error message
        setLoading(false); // ensure loading state is updated even on error
      }
    };

    loadLeaderboard(); // invoke the data loading function
  }, []); 

  // get the medal icon based on the ranking position
  const getMedalIcon = (index) => {
    if (index === 0) return <FontAwesomeIcon icon={faMedal} className="text-yellow-500" />;  
    if (index === 1) return <FontAwesomeIcon icon={faMedal} className="text-gray-400" />; 
    if (index === 2) return <FontAwesomeIcon icon={faMedal} className="text-orange-500" />; 
    return null; 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softCream px-4">
      {/* container for leaderboard content */}
      <div className="w-full max-w-3xl p-8 bg-softCream rounded-lg shadow-lg text-burntYellow">
        {/* title of the leaderboard */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-[RussoOne] text-burntYellow text-center">
          Leaderboard
        </h2>
        {/* list of scores or status messages */}
        <ul className="space-y-4">
          {loading ? (
            // show loading message while data is being fetched
            <li className="text-burntYellow text-lg sm:text-xl text-center">
              Loading top scores...
            </li>
          ) : error ? (
            // show an error message if data fetch fails
            <li className="text-red-500 text-lg sm:text-xl text-center">
              {error}
            </li>
          ) : topScores.length === 0 ? (
            // message when there are no scores available
            <li className="text-burntYellow text-lg sm:text-xl text-center">
              No users have played yet. Be the first to score!
            </li>
          ) : (
            // display the leaderboard scores
            topScores.map((user, index) => (
              <li
                key={index} // unique key for each list item
                className="text-md sm:text-xl font-[RussoOne] text-burntYellow flex items-center justify-center space-x-2"
              >
                {getMedalIcon(index)} {/* display medal icon for top 3 ranks */}
                {index > 2 && <span className="font-bold">{index + 1}. </span>} {/* show rank number for other users */}
                <span>{user.username}</span>: {user.highScore} {/* ssername and score */}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
