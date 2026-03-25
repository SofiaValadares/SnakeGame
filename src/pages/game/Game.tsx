import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Game.css';

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {
  return (
    <div className="game-page">
      <h1>GAME</h1>
      <Link to="/">Voltar ao início</Link>
    </div>
  );
};

export default GamePage;