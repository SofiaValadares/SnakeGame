import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import HomeSelectionBoard from './components/HomeSelectionBoard';
import './Home.css';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="ds-screen ds-screen--top ds-screen--viewport ds-screen--fill">
      <div className="home-panel">
        <header className="home-panel__header">
          <h1 className="ds-title">Snake</h1>
        </header>
        <div className="home-selection-mount">
          <HomeSelectionBoard />
        </div>
        <footer className="home-panel__footer">
          <Link to="/game" className="ds-btn ds-btn--primary home-panel__play">
            Jogar
          </Link>
          <span className="ds-caption ds-blink">▍</span>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
