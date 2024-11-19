import React from 'react';

// a component displays a message (win or lose) and provides a button for the user to restart the game.
const GameMessage = ({ message, buttonText, onButtonClick }) => {
  return (
    // a full-screen overlay for the message, with a semi-transparent background.
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
      {/* it displays the game message (e.g., "You Win!" or "Game Over"). */}
      <h1 className="text-white text-3xl mb-4">{message}</h1>
      
      {/* button to perform the restart action. 
          onButtonClick is triggered when the button is clicked. */}
      <button
        onClick={onButtonClick}
        className="px-4 py-2 text-xl bg-gray-800 text-white rounded border-3 border-gray-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default GameMessage;
