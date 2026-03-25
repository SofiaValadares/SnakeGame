import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import HomeSelectionBoard from './components/HomeSelectionBoard';
import './Home.css';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="ds-screen ds-screen--top ds-screen--viewport">
      <div className="ds-panel home-panel">
        <header className="ds-panel__header">
          <h1 className="ds-title">Snake</h1>
          <p className="ds-subtitle">
            Personaliza a cobra · categoria + competência
          </p>
        </header>
        <div className="home-selection-mount">
          <HomeSelectionBoard />
        </div>
        <footer className="ds-panel__footer">
          <Link to="/game" className="ds-btn ds-btn--primary">
            Jogar
          </Link>
          <span className="ds-caption ds-blink">▍</span>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
