import React from 'react';
import exitButtonImage from './exit-button.png';

const GoToGoogleButton = () => {
  const goToGoogle = () => {
    window.location.assign('https://www.google.com');
  };

  return (
    <button type="button" className="image-button" onClick={goToGoogle}>
      <img src={exitButtonImage} alt="Exit"></img>
    </button>
  );
};

export default GoToGoogleButton;
