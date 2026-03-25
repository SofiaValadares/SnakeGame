import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { reactRouterFutureFlags } from '../../../config/reactRouterFuture';
import { SnakeThemeProvider } from '../../../context/SnakeThemeContext';
import GamePage from '../../../pages/game/Game';

const portfolioKey = 'REACT_APP_PORTFOLIO_URL';

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
  let previousPortfolio: string | undefined;

  beforeEach(() => {
    previousPortfolio = process.env[portfolioKey];
  });

  afterEach(() => {
    if (previousPortfolio === undefined) delete process.env[portfolioKey];
    else process.env[portfolioKey] = previousPortfolio;
  });

  it('renders board and control panel', () => {
    renderGame();
    expect(screen.getByRole('application', { name: /jogo snake/i })).toBeInTheDocument();
    expect(screen.getByText('Painel')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pausar/i })).toBeInTheDocument();
  });

  it('toggles pause label', async () => {
    renderGame();
    const pauseBtn = screen.getByRole('button', { name: /pausar/i });
    await userEvent.click(pauseBtn);
    expect(screen.getByRole('button', { name: /continuar/i })).toBeInTheDocument();
  });

  it('shows portfolio link when env URL is set', () => {
    process.env[portfolioKey] = 'https://meu-site.example';
    renderGame();
    const link = screen.getByRole('link', { name: /^portfólio$/i });
    expect(link).toHaveAttribute('href', 'https://meu-site.example');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('shows disabled portfolio placeholder when env is unset', () => {
    delete process.env[portfolioKey];
    renderGame();
    expect(
      screen.getByRole('button', { name: /portfólio \(em breve\)/i })
    ).toBeDisabled();
  });

  it('links back to home', () => {
    renderGame();
    expect(screen.getByRole('link', { name: /menu principal/i })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
