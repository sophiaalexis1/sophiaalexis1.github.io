import React, { useState } from 'react';
import './WinningPointsSelector.css'

const WinningPointsSelector = ({ onSelect }) => {
  // State to hold the selected number of points to win
  const [selectedPoints, setSelectedPoints] = useState(3); // Default to 3 points

  // Event handler for dropdown change
  const handlePointsChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedPoints(selectedValue);

    // Pass the selected value to the parent component via callback
    onSelect(selectedValue);
  };

  return (
    <div className='points'>
      <label htmlFor="winningPoints">Raise To:</label>
      <select
        id="winningPoints"
        value={selectedPoints}
        onChange={handlePointsChange}
      >
        {[3, 5, 9].map((points) => (
          <option key={points} value={points}>
            {points}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WinningPointsSelector;
