import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useSnakeTheme } from '../../context/SnakeThemeContext';
import {
  readHighScore,
  updateHighScoreIfHigher,
  writeHighScore,
} from '../../utils/highScore';
import GameControlsPanel from './components/GameControlsPanel';
import SnakeGame, { Direction, SnakeGameHandle } from './components/SnakeGame';
import './Game.css';

interface GamePageProps {}

const GamePage: FC<GamePageProps> = () => {
  const snakeRef = useRef<SnakeGameHandle>(null);
  const scoreRef = useRef(0);
  const [score, setScore] = useState(0);
  const [record, setRecord] = useState(() => readHighScore());
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const { primaryColor, secondaryColor } = useSnakeTheme();

  const onScore = useCallback((n: number) => {
    scoreRef.current = n;
    setScore(n);
    setRecord((prev) => {
      if (n <= prev) return prev;
      writeHighScore(n);
      return n;
    });
  }, []);

  const onGameOver = useCallback((over: boolean) => {
    setGameOver(over);
    if (over) {
      setRecord((prev) => updateHighScoreIfHigher(Math.max(prev, scoreRef.current)));
    }
  }, []);

  useEffect(() => {
    setRecord(readHighScore());
  }, []);

  const queueDir = (dir: Direction) => {
    snakeRef.current?.queueDirection(dir);
  };

  const togglePause = () => {
    if (gameOver) return;
    setPaused((p) => !p);
  };

  const newGame = () => {
    setPaused(false);
    setGameOver(false);
    snakeRef.current?.reset();
  };

  return (
    <div className="ds-screen ds-screen--top ds-screen--viewport ds-screen--fill">
      <div className="game-page">
        <header className="game-page__header">
          <h1 className="ds-heading">Snake</h1>
        </header>

        <div className="game-scoreboard" aria-live="polite">
          <div className="game-scoreboard__item">
            <span className="game-scoreboard__label">Pontuação</span>
            <span className="game-scoreboard__value">{score}</span>
          </div>
          <div className="game-scoreboard__item">
            <span className="game-scoreboard__label">Recorde</span>
            <span className="game-scoreboard__value game-scoreboard__value--record">
              {record}
            </span>
          </div>
        </div>

        <div className="game-layout">
          <div className="game-board-column">
            <div className="game-board-wrap">
              <SnakeGame
                ref={snakeRef}
                paused={paused}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onScore={onScore}
                onGameOver={onGameOver}
              />
              {paused && !gameOver && (
                <div className="game-overlay">
                  Pausa
                  <br />
                  <span className="game-hint">Continuar no painel</span>
                </div>
              )}
              {gameOver && (
                <div className="game-overlay">
                  Game over
                  <br />
                  <span className="game-hint">
                    Espaço, Enter ou novo jogo
                  </span>
                </div>
              )}
            </div>
          </div>

          <GameControlsPanel
            paused={paused}
            gameOver={gameOver}
            onDirection={queueDir}
            onTogglePause={togglePause}
            onNewGame={newGame}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePage;
