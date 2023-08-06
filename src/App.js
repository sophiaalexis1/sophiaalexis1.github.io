import React, { useState } from 'react';
import GoToGoogleButton from './Components/GoToGoogleButton/GoToGoogleButton';
import PaperButtonImage from './Assets/Paper.jpeg';
import RockButtonImage from './Assets/rock copy.png';
import ScissorsButtonImage from './Assets/scissors.png';
import AiImage from './Assets/AI thinking.png';
import './App.css';

const choices = ['rock', 'paper', 'scissors'];
const roundsToWin = 2;
// const maxRounds=3;

const RockPaperScissors = () => {
  const [roundNumber, setRoundNumber] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [result, setResult] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

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
      setIsPlayerTurn(false); 
    // if (roundNumber <= maxRounds && isPlayerTurn) {
    //   const computerSelection = computerPlay();
    //   setPlayerSelection(playerSelection);
    //   setComputerSelection(computerSelection);
    //   const roundResult = determineWinner(playerSelection, computerSelection);
    //   updateScore(roundResult);
    //   setResult(roundResult);

    //   if (roundNumber < maxRounds) {
    //     setRoundNumber(roundNumber + 1);
    //     setIsPlayerTurn(false);
    //   } else {
    //     setIsPlayerTurn(false);
    //     announceWinner();
    //   }
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
    <div className="game-container">
      <div className='header-container'>
      <h1>Play Rock, Paper, Scissors Against AI</h1>
      <h3>Round {roundNumber} </h3>
      {/* {isPlayerTurn && <p>Take your pick:</p>} */}
      <p>Take your pick:</p>
      </div>
      <p>Player: {playerScore} | Computer: {computerScore}</p> {/* Display scores here */}
      <br></br>
      <div className='choice-container'>
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
        <p>
        <img
          src={AiImage}
          alt="AI Image Thinking"
          style={{ width: '150px', height: 'auto' }}
        />
        </p>
      </div>
      <p>You chose {playerSelection}, Computer chose {computerSelection}. {result}</p>
      {playerScore >= roundsToWin || computerScore >= roundsToWin ? (
        <button onClick={resetGame}>Play Again</button>
      ) : null}
      {/* <p>You chose {playerSelection}, Computer chose {computerSelection}. {result}</p> */}
      {/* <p>Player: {playerScore} | Computer: {computerScore}</p>
      {roundNumber <= maxRounds && (playerScore >= maxRounds || computerScore >= maxRounds) ? (
        <button onClick={resetGame}>Play Again</button>
      ) : null} */}
      <div className="exit-button-container">
        <GoToGoogleButton/>
      </div>
    </div>
  );
};

export default RockPaperScissors;
