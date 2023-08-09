import React from 'react';
import './GameRules.css';

const GameRules = () => {
  return (
    <div className='game-rules'>
      <h2>Game Rules</h2>
      <p>
        The game begins with you and the AI each having 0 points.<br />
        1.You will make your selection by clicking on the icon you choose for each round. The available options are:<br />
        <ul>
          <li><strong>✊ (Rock)</strong></li>
          <li><strong>✋ (Paper)</strong></li>
          <li><strong>✌️ (Scissors)</strong></li>
        </ul>
        2. After you make your choice for the current round, AI will randomly generate a choice.<br />
        3. The winner of each round will be determined based on the rules mentioned earlier.<br />
        4. If there's a tie (both you and the AI choose the same icon), no one gets a point for that round.<br />
        5. Continue playing three rounds in total, automation will keep track of points after each round.<br />
        6. The first player to win two rounds (get two points) will be the overall winner of the game.<br />
        7. In case you or the AI win two rounds before completing all three, we'll end the game and declare the winner.
      </p>
    </div>
  );
};

export default GameRules;
