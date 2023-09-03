import React, { useState, useEffect } from 'react';

// ShowResult component
const ShowResult = ({ playerSelection, computerSelection, result, show }) => {
    return (
      <div>
        {show && (
          <p>You chose {playerSelection}, AI chose {computerSelection}. {result}</p>
        )}
      </div>
    );
  };

export default ShowResult;
