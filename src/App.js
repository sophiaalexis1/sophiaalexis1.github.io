import React, { useState, useEffect } from 'react';
import GoToGoogleButton from './Components/GoToGoogleButton/GoToGoogleButton';
import PaperButtonImage from './Assets/Game-Paper.jpg';
import RockButtonImage from './Assets/Game-Rock.jpg';
import ScissorsButtonImage from './Assets/Game-Scissors.jpg';
import AiImage from './Assets/Game-AI thinks.jpg';
import GameRules from './Components/GameRules/GameRules';
import YouWin from './Assets/YouWin.png';
import AiWin from './Assets/AiWins.png';
import ShowResult from './Components/ShowResult/ShowResult';
import './App.css';

const choices = ['rock', 'paper', 'scissors'];
const roundsToWin = 3;
// const maxRounds=3;

const RockPaperScissors = () => {
  const [roundNumber, setRoundNumber] = useState(1);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerSelection, setPlayerSelection] = useState('');
  const [computerSelection, setComputerSelection] = useState('');
  const [result, setResult] = useState('');
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerWins, setPlayerWins] = useState(false);
  const [computerWins, setComputerWins] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0); // Add a state variable for blink count
  const [showYouWin, setShowYouWin] = useState(false);
  const [showAIWin, setShowAIWin] = useState(false);

  useEffect(() => {
    // Check if the player has won and display "You Win" message
    if (playerScore >= roundsToWin) {
      setShowYouWin(true);
      startBlinking();
    } else {
      setShowYouWin(false);
    }

    // Check if the computer has won and display "AI Wins" message
    if (computerScore >= roundsToWin) {
      setShowAIWin(true);
      startBlinking();
    } else {
      setShowAIWin(false);
    }
  }, [playerScore, computerScore]);

  const startBlinking = () => {
    let blinkCounter = 0; // Initialize a counter for blinks

    // Start blinking by setting an interval
    const blinkInterval = setInterval(() => {
      setBlinkCount((prevCount) => prevCount + 1);
      blinkCounter++; // Increment the blink counter

      // Check if it has blinked three times
      if (blinkCounter === 5) {
        clearInterval(blinkInterval); // Clear the interval after three blinks
        resetGame(); // Reset the game
      }
    }, 1000); // Blink every 1000 milliseconds (1 second)
  };

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
        setIsPlayerTurn(false);
        determineWinner()
        
        setTimeout(() => {
          setIsButtonsVisible(true);
          setAiChosenImage(AiImage);
          setPlayerSelectedImage(null);
          setShowResult(false);
          setRoundNumber(roundNumber + 1);
        }, 4000);
        
        setTimeout(() => {
          setAiChosenImage(AiImage);
        }, 3000);
        
        setShowResult(true);
      }, 1000);
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
      console.log("Game should be announced as over.")
      announceWinner();
    }
  };

  const announceWinner = () => {
    if (playerScore > computerScore) {
      setResult("Congratulations! You win the game!");
      setPlayerWins(true);
    } else {
      setResult("Game over. Computer wins!");
      setComputerWins(true);
    }
  };

  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerSelection('');
    setComputerSelection('');
    setResult('');
    setRoundNumber(1);
    setPlayerWins(false);
    setComputerWins(false);
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
            <h3>YOUR SCORE: </h3>
            <p> {playerScore} </p>
          </div>
          <div className='choice-container'>
            <div className='player-choice'>

              <button 
                onClick={() => play('rock')} disabled={disableButtons()} style={{ display: isButtonsVisible ? 'block' : 'none' }} className="game-button">
                <img srcSet={`${RockButtonImage} 320w, ${RockButtonImage} 680w, ${RockButtonImage}   960w, ${RockButtonImage} 1980w`} src={RockButtonImage} alt="Rock" ></img>
              </button>
              <button onClick={() => play('paper')} disabled={disableButtons()} style={{ display: isButtonsVisible ? 'block' : 'none' }}>
                <img srcSet={`${PaperButtonImage} 320w, ${PaperButtonImage} 680w, ${PaperButtonImage}   960w, ${PaperButtonImage} 1980w`} src={PaperButtonImage} alt="Paper" ></img>
              </button>
              <button onClick={() => play('scissors')} disabled={disableButtons()} style={{ display: isButtonsVisible ? 'block' : 'none' }}>
                <img srcSet={`${ScissorsButtonImage} 320w, ${ScissorsButtonImage} 680w, ${ScissorsButtonImage}   960w, ${ScissorsButtonImage} 1980w`} src={ScissorsButtonImage} alt="Scissor" ></img>
              </button>

            </div>
            {/* Display the player's selected image */}
            {playerSelectedImage && (
              <img srcSet={`${playerSelectedImage} 320w, ${playerSelectedImage} 680w, ${playerSelectedImage}   960w, ${playerSelectedImage} 1980w`} src={playerSelectedImage} alt="Player Selected" ></img>
            )}
          </div>
          <p> Take your pick</p>
        </div>
        {playerScore >= roundsToWin && (
          <div className="overlay overlay-win">
            <img src={YouWin} alt="Winning" />
          </div>
        )}
        {computerScore >= roundsToWin && (
          <div className="overlay overlay-ai-win">
            <img src={AiWin} alt="Winning" />
          </div>
        )}

        <div>
          <div className='computer-score'>
            <h3>AI SCORE:</h3>
            <p> {computerScore}</p> {/* Display scores here */}
            <img
              srcSet={`${aiChosenImage} 320w, ${aiChosenImage} 680w, ${aiChosenImage}   960w, ${aiChosenImage} 1980w`}
              src={aiChosenImage}
              alt="AI Chosen"
              // style={{ width: 'auto', height: 'auto' }}
            />
            <br />
            <p></p>
          </div>
        </div>
      </div>
      <ShowResult 
        playerSelection={playerSelection}
        computerSelection={computerSelection}
        result={result}
        show={showResult}
      />
      {/* {playerScore >= roundsToWin || computerScore >= roundsToWin ? (
        <button onClick={resetGame} className='play-again'>Play Again</button>
      ) : null} */}
      {/* <p>You chose {playerSelection}, Computer chose {computerSelection}. {result}</p> */}
      {/* <p>Player: {playerScore} | Computer: {computerScore}</p>
      {roundNumber <= maxRounds && (playerScore >= maxRounds || computerScore >= maxRounds) ? (
        <button onClick={resetGame}>Play Again</button>
      ) : null} */}
      <br />
      <GameRules />
      <br />
      <div className='exit-button-container'>
        <GoToGoogleButton />
      </div>
    </div>
  );
};

export default RockPaperScissors;
