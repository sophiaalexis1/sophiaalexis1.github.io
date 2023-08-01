import React, { useState } from 'react';
import GoToGoogleButton from './Components/GoToGoogleButton/GoToGoogleButton';
import './App.css';

const choices = ['rock', 'paper', 'scissors'];
const roundsToWin = 2;

const RockPaperScissors = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [result, setResult] = useState('');

  const computerPlay = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const play = (playerSelection) => {
    if (playerScore < roundsToWin && computerScore < roundsToWin) {
      const computerSelection = computerPlay();
      setPlayerSelection(playerSelection);
      setComputerSelection(computerSelection);
      const roundResult = determineWinner(playerSelection, computerSelection);
      updateScore(roundResult);
      setResult(roundResult);
    }
  };

  const determineWinner = (playerSelection, computerSelection) => {
    if (playerSelection === computerSelection) {
      return "It's a tie!";
    } else if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
      setPlayerScore((prevScore) => prevScore + 1);
      return "You win!";
    } else {
      setComputerScore((prevScore) => prevScore + 1);
      return "Computer wins!";
    }
  };

  const updateScore = (roundResult) => {
    if (playerScore >= roundsToWin || computerScore >= roundsToWin) {
      announceWinner();
    }
  };

  const announceWinner = () => {
    if (playerScore > computerScore) {
      setResult("Congratulations! You win the game!");
    } else {
      setResult("Game over. Computer wins!");
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerSelection('');
    setComputerSelection('');
    setResult('');
  };

  const disableButtons = () => {
    return playerScore >= roundsToWin || computerScore >= roundsToWin;
  };

  return (
    <div>
      <h1>Play Rock, Paper, Scissors Against AI</h1>
      <p>Make your choice: 
        <button onClick={() => play('rock')} disabled={disableButtons()}>Rock</button>
        <button onClick={() => play('paper')} disabled={disableButtons()}>Paper</button>
        <button onClick={() => play('scissors')} disabled={disableButtons()}>Scissors</button>
      </p>
      <p>You chose {playerSelection}, Computer chose {computerSelection}. {result}</p>
      <p>Player: {playerScore} | Computer: {computerScore}</p>
      {playerScore >= roundsToWin || computerScore >= roundsToWin ? (
        <button onClick={resetGame}>Play Again</button>
      ) : null}
      <p>
        <GoToGoogleButton/>
      </p>
    </div>
  );
};

export default RockPaperScissors;
