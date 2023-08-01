import React from 'react';

const GoToGoogleButton = () => {
  const goToGoogle = () => {
    window.location.assign('https://www.google.com');
  };

  return (
    <button onClick={goToGoogle}>Exit Game</button>
  );
};

export default GoToGoogleButton;
