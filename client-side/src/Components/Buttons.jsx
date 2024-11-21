import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faRedo, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

const ButtonGroup = ({ onUndo, onRestart, onToggleSound, soundEnabled }) => {
    return (
      <div className="absolute top-44 flex space-x-2 sm:top-24 md:left-16 md:top-36">
        {/* undo Button */}
        <button
          onClick={onUndo}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-softCream text-rustOrange hover:bg-burntYellow hover:text-softCream shadow-lg transition md:w-12 md:h-12"
          title="Undo Move"
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>
  
        {/* restart Button */}
        <button
          onClick={onRestart}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-softCream text-oliveGreen hover:bg-burntYellow hover:text-softCream shadow-lg transition md:w-12 md:h-12"
          title="Restart Game"
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>
  
        {/* sound Button */}
        <button
          onClick={onToggleSound}
          className={`w-8 h-8 flex items-center justify-center rounded-full bg-softCream ${
            soundEnabled ? 'text-rustOrange' : 'text-burntYellow'
          } hover:bg-burntYellow hover:text-softCream shadow-lg transition md:w-12 md:h-12`}
          title={soundEnabled ? 'Turn Sound Off' : 'Turn Sound On'}
        >
          <FontAwesomeIcon icon={soundEnabled ? faVolumeHigh : faVolumeXmark} />
        </button>
      </div>
    );
};
  

export default ButtonGroup;
