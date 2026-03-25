import React, { FC, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPortfolioUrl } from '../../config/externalLinks';
import { useSnakeTheme } from '../../context/SnakeThemeContext';
import SnakeGame, { Direction, SnakeGameHandle } from './components/SnakeGame';
import './Game.css';

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {
  const snakeRef = useRef<SnakeGameHandle>(null);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const onScore = useCallback((n: number) => setScore(n), []);
  const onGameOver = useCallback((over: boolean) => setGameOver(over), []);

  const portfolioUrl = getPortfolioUrl();
  const { stripeA, stripeB } = useSnakeTheme();

  const queueDir = (dir: Direction) => {
    snakeRef.current?.queueDirection(dir);
  };

  const togglePause = () => {
    if (gameOver) return;
    setPaused((p) => !p);
  };

  const newGame = () => {
    setPaused(false);
    snakeRef.current?.reset();
  };

  return (
    <div className="ds-screen ds-screen--top ds-screen--viewport">
      <div className="game-page">
        <header className="game-page__header">
          <p className="ds-tag">Arcade</p>
          <h1 className="ds-heading">Snake</h1>
          <p className="ds-caption">
            Come maçãs, cresce e evita bater nas paredes ou em ti.
          </p>
        </header>

        <div className="game-layout">
          <div className="game-board-column">
            <div className="game-board-wrap">
              <SnakeGame
                ref={snakeRef}
                paused={paused}
                stripeA={stripeA}
                stripeB={stripeB}
                onScore={onScore}
                onGameOver={onGameOver}
              />
              {paused && !gameOver && (
                <div className="game-overlay">
                  Pausa
                  <br />
                  <span className="game-hint">Clica em continuar no painel</span>
                </div>
              )}
              {gameOver && (
                <div className="game-overlay">
                  Game over
                  <br />
                  <span className="game-hint">
                    Espaço, Enter ou clica para jogar outra vez
                  </span>
                </div>
              )}
            </div>
            <p className="game-hint">
              Clica no tabuleiro para focar teclas. Setas ou WASD.
            </p>
          </div>

          <aside className="game-sidebar" aria-label="Controlos e opções">
            <h2 className="game-sidebar__title">Painel</h2>
            <p className="game-sidebar__label">Pontuação (maçãs)</p>
            <p className="game-score" aria-live="polite">
              {score}
            </p>

            <p className="game-sidebar__label">Direção</p>
            <div className="game-dpad" role="group" aria-label="Direções">
              <div className="game-dpad__cell" />
              <div className="game-dpad__cell">
                <button
                  type="button"
                  className="ds-btn ds-btn--secondary game-dpad__btn"
                  aria-label="Cima"
                  onClick={() => queueDir('UP')}
                >
                  ▲
                </button>
              </div>
              <div className="game-dpad__cell" />
              <div className="game-dpad__cell">
                <button
                  type="button"
                  className="ds-btn ds-btn--secondary game-dpad__btn"
                  aria-label="Esquerda"
                  onClick={() => queueDir('LEFT')}
                >
                  ◀
                </button>
              </div>
              <div className="game-dpad__cell" />
              <div className="game-dpad__cell">
                <button
                  type="button"
                  className="ds-btn ds-btn--secondary game-dpad__btn"
                  aria-label="Direita"
                  onClick={() => queueDir('RIGHT')}
                >
                  ▶
                </button>
              </div>
              <div className="game-dpad__cell" />
              <div className="game-dpad__cell">
                <button
                  type="button"
                  className="ds-btn ds-btn--secondary game-dpad__btn"
                  aria-label="Baixo"
                  onClick={() => queueDir('DOWN')}
                >
                  ▼
                </button>
              </div>
              <div className="game-dpad__cell" />
            </div>

            <p className="game-sidebar__label">Teclado</p>
            <p className="ds-caption game-sidebar__keyboard-hint">
              ↑ ↓ ← → ou W A S D
            </p>

            <div className="game-sidebar-actions">
              <button
                type="button"
                className="ds-btn ds-btn--primary"
                onClick={togglePause}
                disabled={gameOver}
              >
                {paused ? 'Continuar' : 'Pausar'}
              </button>
              <button type="button" className="ds-btn ds-btn--ghost" onClick={newGame}>
                Novo jogo
              </button>
              <Link to="/" className="ds-btn ds-btn--ghost">
                Menu principal
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
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
