import React, { useState } from 'react';
import GoToGoogleButton from './Components/GoToGoogleButton/GoToGoogleButton';
import PaperButtonImage from './Assets/Game-Paper.jpg';
import RockButtonImage from './Assets/Game-Rock.jpg';
import ScissorsButtonImage from './Assets/Game-Scissors.jpg';
import AiImage from './Assets/Game-AI thinks.jpg';
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

  const [aiChosenImage, setAiChosenImage] = useState(AiImage);
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const [playerSelectedImage, setPlayerSelectedImage] = useState(null);


  const play = (playerSelection) => {
    if (playerScore < roundsToWin && computerScore < roundsToWin) {
      setIsButtonsVisible(false);

      const computerSelection = computerPlay();
      setPlayerSelection(playerSelection);
      setComputerSelection(computerSelection);
      setAiChosenImage(AiImage);

      setPlayerSelectedImage(getPlayerImageByChoice(playerSelection));

      setTimeout(() => {
        setAiChosenImage(getAiImageByChoice(computerSelection));
        const roundResult = determineWinner(playerSelection, computerSelection);
        updateScore(roundResult);
        setResult(roundResult);
        setRoundNumber(roundNumber + 1);
        setIsPlayerTurn(false);

        setTimeout(() => {
          setIsButtonsVisible(true);
          setAiChosenImage(AiImage);
          setPlayerSelectedImage(null); 
        }, 2000);
      }, 3000);
    }
  };
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
  
  const getPlayerImageByChoice = (choice) => {
    switch (choice) {
      case 'rock':
        return RockButtonImage;
      case 'paper':
        return PaperButtonImage;
      case 'scissors':
        return ScissorsButtonImage;
      default:
        return null;
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

  const getAiImageByChoice = (choice) => {
    // Implement logic to map AI's choice to corresponding image
    // For example, if choice is 'rock', return RockButtonImage
    switch (choice) {
      case 'rock':
        return RockButtonImage;
      case 'paper':
        return PaperButtonImage;
      case 'scissors':
        return ScissorsButtonImage;
      default:
        return AiImage;
    }
  };

  return (
    <div>
      <div className='header-container'>
        <h1>Play Rock Paper Scissors Against AI</h1>
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
            <div className='player-choice'>
              
                <button onClick={() => play('rock')} disabled={disableButtons()} style={{ display: isButtonsVisible ? 'block' : 'none' }}>
                <img src={RockButtonImage} alt="Rock" style={{ width: 'auto', height: 'auto' }}></img>
                </button>
                <button onClick={() => play('paper')} disabled={disableButtons()} style={{ display: isButtonsVisible ? 'block' : 'none' }}>
                <img src={PaperButtonImage} alt="Paper" style={{ width: 'auto', height: 'auto' }}></img>
                </button>
                <button onClick={() => play('scissors')} disabled={disableButtons()} style={{ display: isButtonsVisible ? 'block' : 'none' }}>
                <img src={ScissorsButtonImage} alt="Scissor" style={{ width: 'auto', height: 'auto' }}></img>
                </button>
              
            </div>
            {/* Display the player's selected image */}
            {playerSelectedImage && (
            <img src={playerSelectedImage} alt="Player Selected" style={{ width: 'auto', height: 'auto' }}></img>
            )}
          </div>
          <p> Take your pick</p>
        </div>
      <div>
      <div className='computer-score'>
        <p>AI SCORE:</p> 
        <p> {computerScore}</p> {/* Display scores here */}
          <img
            src={aiChosenImage}
            alt="AI Chosen"
            style={{ width: '250px', height: '250px' }}
          />
        <br />
        <p></p>
      </div>
    </div>
    </div>
    <p>You chose {playerSelection}, AI chose {computerSelection}. {result}</p>
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
