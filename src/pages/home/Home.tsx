import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import HomeSelectionBoard from './components/HomeSelectionBoard';
import './Home.css';
import {getPortfolioUrl} from "../../config/externalLinks";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const portfolioUrl = getPortfolioUrl();

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
          {portfolioUrl ? (
              <a
                  href={portfolioUrl}
                  className="ds-btn ds-btn--ghost"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                Portfólio
              </a>
          ) : (
              <button
                  type="button"
                  className="ds-btn ds-btn--ghost"
                  disabled
                  title="Define REACT_APP_PORTFOLIO_URL no .env"
              >
                Portfólio (em breve)
              </button>
          )}
          <span className="ds-caption ds-blink">▍</span>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
