import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="home-page">
      <h1>HOME</h1>
      <Link to="/game">Ir para o jogo</Link>
    </div>
  );
};

export default HomePage;