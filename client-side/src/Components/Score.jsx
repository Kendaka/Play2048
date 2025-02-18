import React, { useState, useEffect } from "react";
import { authenticatedRequest } from "../Services/authService"; 

const Score = (props) => {
  const [highScore, setHighScore] = useState(0);
  const [error, setError] = useState(null);
  const isGuest = localStorage.getItem('guestMode') === 'true'; 

  // fetch initial high score when the component mounts
  useEffect(() => {
    if (isGuest) {
    
      const localHighScore = localStorage.getItem('guestHighScore') || 0;
      setHighScore(parseInt(localHighScore, 10));
    } else {
      const fetchHighScore = async () => {
        try {          const response = await authenticatedRequest(
            "http://localhost:5000/api/auth/highscore"
          );
          setHighScore(response.highScore); 
        } catch (error) {
          setError("Loading.."); 
          console.error("Error fetching high score:", error); 
        }
      };
    fetchHighScore(); 
    }
  }, [isGuest]); 

  // update high score on the server if the current score exceeds the high score
  useEffect(() => {
    if (props.score > highScore) {
      if (isGuest) {
        
        localStorage.setItem('guestHighScore', props.score);
        setHighScore(props.score);
      } else {
        
        const updateHighScore = async () => {
          try {
            const response = await authenticatedRequest(
              "http://localhost:5000/api/auth/highscore",
              "PUT",
              { score: props.score }
            );
            setHighScore(response.highScore);
          } catch (error) {
            setError("Failed to update high score");
          }
        };
        updateHighScore();
      }
    }
  }, [props.score, highScore, isGuest]);

  return (
    <div className="absolute top-32 left-0 w-full flex justify-center items-center gap-x-4 px-4 md:top-22 md:right-12 sm:top-8 sm:right-2 sm:left-auto sm:w-auto sm:flex-col sm:gap-y-2">
      {/* display current score */}
      <h1 className="text-md text-rustOrange px-5 py-1 border border-oliveGreen rounded bg-burntYellow font-[Poppins] sm:text-lg sm:px-3 md:px-5">
        Score: {props.score}
      </h1>

      {/* display high score or an error message */}
      {error ? (
        <h1 className="text-md text-rustOrange px-2 py-1 border border-oliveGreen rounded bg-burntYellow font-[Poppins] sm:text-lg sm:px-3  md:px-3">
          {error}
        </h1>
      ) : (
        <h1 className="text-md text-rustOrange px-5 py-1 border border-oliveGreen rounded bg-burntYellow font-[Poppins] sm:text-lg sm:px-3 md:px-3">
          High Score: {highScore}
        </h1>
      )}
    </div>
  );
};

export default Score;
