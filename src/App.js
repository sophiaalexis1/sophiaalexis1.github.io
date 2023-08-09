import React, { useState } from 'react';
import GoToGoogleButton from './Components/GoToGoogleButton/GoToGoogleButton';
import PaperButtonImage from './Assets/paper.png';
import RockButtonImage from './Assets/rock.png';
import ScissorsButtonImage from './Assets/scissors.png';
import AiImage from './Assets/AI thinking 2.png';
import GameRules from './Components/GameRules/GameRules'
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
    setRoundNumber(1);
  };

  const disableButtons = () => {
    return playerScore >= roundsToWin || computerScore >= roundsToWin;
  };

  return (
    <div>
      <div className='header-container'>
        <h1>Play Rock, Paper, Scissors Against AI</h1>
        <h2 className='round'>ROUND {roundNumber} </h2>
        {/* {isPlayerTurn && <p>Take your pick:</p>} */}
      </div>
      <div className='game-container'>
        <div className='scores-container'>
          <div className='player-score'>
            <p>YOUR SCORE: </p> 
            <p> {playerScore} </p> 
          </div>
          <div className='choice-container'>
            <p>
              <button onClick={() => play('rock')} disabled={disableButtons()}>
              <img src={RockButtonImage} alt="Rock" style={{ width: '250px', height: '250' }}></img>
              </button>
              <button onClick={() => play('paper')} disabled={disableButtons()}>
              <img src={PaperButtonImage} alt="Paper" style={{ width: '250px', height: '250' }}></img>
              </button>
              <button onClick={() => play('scissors')} disabled={disableButtons()}>
              <img src={ScissorsButtonImage} alt="Scissor" style={{ width: '250px', height: '250' }}></img>
              </button>
            </p>
          </div>
          <p> Take your pick</p>
        </div>
      <div>
      <div className='computer-score'>
        <p>Computer:</p> 
        <p> {computerScore}</p> {/* Display scores here */}
          <img
            src={AiImage}
            alt="AI Image Thinking"
            style={{ width: '250px', height: '250' }}
          />
      </div>
    </div>
    </div>
    <p>You chose {playerSelection}, Computer chose {computerSelection}. {result}</p>
    {playerScore >= roundsToWin || computerScore >= roundsToWin ? (
      <button onClick={resetGame} className='play-again'>Play Again</button>
      ) : null}
      {/* <p>You chose {playerSelection}, Computer chose {computerSelection}. {result}</p> */}
      {/* <p>Player: {playerScore} | Computer: {computerScore}</p>
      {roundNumber <= maxRounds && (playerScore >= maxRounds || computerScore >= maxRounds) ? (
        <button onClick={resetGame}>Play Again</button>
      ) : null} */}
    <br />
    <GameRules />
    <br />
    <div className='exit-button-container'>
        <GoToGoogleButton/>
    </div>
    </div>
  );
};

export default RockPaperScissors;
