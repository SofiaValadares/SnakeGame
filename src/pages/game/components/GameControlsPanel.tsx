import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Direction } from './SnakeGame';

interface GameControlsPanelProps {
  paused: boolean;
  gameOver: boolean;
  onDirection: (dir: Direction) => void;
  onTogglePause: () => void;
  onNewGame: () => void;
}

const GameControlsPanel: FC<GameControlsPanelProps> = ({
  paused,
  gameOver,
  onDirection,
  onTogglePause,
  onNewGame,
}) => {
  return (
    <aside className="game-controls-panel" aria-label="Comandos do jogo">
      <h2 className="game-controls-panel__title">Comandos</h2>
      <p className="game-controls-panel__intro ds-caption">
        Usa as setas ou WASD para mover a cobra
      </p>

      <div className="game-keys" role="group" aria-label="Setas no ecrã">
        <div className="game-keys__row">
          <button
            type="button"
            className="game-keys__key game-keys__key--wide"
            aria-label="Cima"
            onClick={() => onDirection('UP')}
          >
            ↑
          </button>
        </div>
        <div className="game-keys__row">
          <button
            type="button"
            className="game-keys__key"
            aria-label="Esquerda"
            onClick={() => onDirection('LEFT')}
          >
            ←
          </button>
          <span className="game-keys__spacer" />
          <button
            type="button"
            className="game-keys__key"
            aria-label="Direita"
            onClick={() => onDirection('RIGHT')}
          >
            →
          </button>
        </div>
        <div className="game-keys__row">
          <button
            type="button"
            className="game-keys__key game-keys__key--wide"
            aria-label="Baixo"
            onClick={() => onDirection('DOWN')}
          >
            ↓
          </button>
        </div>
      </div>

      <ul className="game-controls-panel__legend">
        <li>
          <kbd>W</kbd> ou <kbd>↑</kbd> — cima
        </li>
        <li>
          <kbd>S</kbd> ou <kbd>↓</kbd> — baixo
        </li>
        <li>
          <kbd>A</kbd> ou <kbd>←</kbd> — esquerda
        </li>
        <li>
          <kbd>D</kbd> ou <kbd>→</kbd> — direita
        </li>
      </ul>

      <p className="ds-caption game-controls-panel__focus-hint">
        Clica no tabuleiro para focar o teclado
      </p>

      <div className="game-controls-panel__actions">
        <button
          type="button"
          className="ds-btn ds-btn--primary"
          onClick={onTogglePause}
          disabled={gameOver}
        >
          {paused ? 'Continuar' : 'Pausar'}
        </button>
        <button type="button" className="ds-btn ds-btn--ghost" onClick={onNewGame}>
          Novo jogo
        </button>
        <Link to="/" className="ds-btn ds-btn--ghost">
          Menu principal
        </Link>
      </div>
    </aside>
  );
};

export default GameControlsPanel;
