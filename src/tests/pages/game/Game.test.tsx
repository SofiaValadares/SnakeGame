import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { reactRouterFutureFlags } from '../../../config/reactRouterFuture';
import { SnakeThemeProvider } from '../../../context/SnakeThemeContext';
import GamePage from '../../../pages/game/Game';

function renderGame() {
  return render(
    <MemoryRouter future={reactRouterFutureFlags}>
      <SnakeThemeProvider>
        <GamePage />
      </SnakeThemeProvider>
    </MemoryRouter>
  );
}

describe('GamePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders board, score, record and controls panel', () => {
    renderGame();
    expect(
      screen.getByRole('application', { name: /jogo snake/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Pontuação')).toBeInTheDocument();
    expect(screen.getByText('Recorde')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /comandos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pausar/i })).toBeInTheDocument();
  });

  it('shows keyboard legend for arrows and WASD', () => {
    renderGame();
    expect(screen.getByText('— cima', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('— direita', { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^cima$/i })).toBeInTheDocument();
  });

  it('toggles pause label', async () => {
    renderGame();
    const pauseBtn = screen.getByRole('button', { name: /pausar/i });
    await userEvent.click(pauseBtn);
    expect(
      screen.getByRole('button', { name: /continuar/i })
    ).toBeInTheDocument();
  });

  it('links back to home', () => {
    renderGame();
    expect(screen.getByRole('link', { name: /menu principal/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
