import React, { useState } from 'react';
import GoToGoogleButton from './Components/GoToGoogleButton/GoToGoogleButton';
import PaperButtonImage from './Assets/Paper.jpeg';
import RockButtonImage from './Assets/rock.png';
import ScissorsButtonImage from './Assets/scissors.png';
import './App.css';

const choices = ['rock', 'paper', 'scissors'];
const roundsToWin = 2;

const RockPaperScissors = () => {
  const [roundNumber, setRoundNumber] = useState(1);
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
      setRoundNumber(roundNumber + 1);
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
      <h3>Round {roundNumber} </h3>
      <br></br>
      <p>
        <button onClick={() => play('rock')} disabled={disableButtons()}>
        <img src={RockButtonImage} alt="Rock" style={{ width: '150px', height: 'auto' }}></img>
        </button>
        <button onClick={() => play('paper')} disabled={disableButtons()}>
        <img src={PaperButtonImage} alt="Paper" style={{ width: '150px', height: 'auto' }}></img>
        </button>
        <button onClick={() => play('scissors')} disabled={disableButtons()}>
        <img src={ScissorsButtonImage} alt="Scissor" style={{ width: '150px', height: 'auto' }}></img>
        </button>
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
