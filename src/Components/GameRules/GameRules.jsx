import React from 'react';
import './GameRules.css';

const GameRules = () => {
  return (
    <div className='game-rules'>
      <h2>GAME RULES</h2>
      <p>
        1. The game consists of a series of rounds, and the first player to win 3 rounds is declared the winner of the match. <br />
        2. In each round, the player chooses one of three possible moves: rock, paper, or scissors. The AI also selects one of these moves.<br />
        3. The moves are compared, and the winner of the round is determined based on the following rules:<br />
        <ul>
          <li>Rock beats scissors (rock crushes scissors).</li>
          <li>Paper beats rock (paper covers rock).</li>
          <li>Scissors beat paper (scissors cut paper).</li>
        </ul>
        4. If both the player and the AI choose the same move, the round is considered a tie, and no points are awarded to either side.<br />
        5. After each round, the winner (or tie) is announced, and the score is updated accordingly.<br />
        6. The game continues until one of the players reaches a score of 3, thus winning the match.
      </p>
    </div>
  );
};

export default GameRules;
