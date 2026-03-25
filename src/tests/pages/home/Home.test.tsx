import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { reactRouterFutureFlags } from '../../../config/reactRouterFuture';
import { SnakeThemeProvider } from '../../../context/SnakeThemeContext';
import HomePage from '../../../pages/home/Home';

function renderHome(initialPath = '/') {
  return render(
    <MemoryRouter
      initialEntries={[initialPath]}
      future={reactRouterFutureFlags}
    >
      <SnakeThemeProvider>
        <HomePage />
      </SnakeThemeProvider>
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  it('renders category and competence lists', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /categorias/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /competências/i })).toBeInTheDocument();
    expect(
      screen.getByRole('listbox', { name: /categorias$/i })
    ).toBeInTheDocument();
  });

  it('updates competences when another category is selected', async () => {
    renderHome();
    await userEvent.click(
      screen.getByRole('option', { name: /ferramentas/i })
    );
    expect(screen.getByRole('option', { name: 'Docker' })).toBeInTheDocument();
  });

  it('links to the game', () => {
    renderHome();
    const play = screen.getByRole('link', { name: /jogar/i });
    expect(play).toHaveAttribute('href', '/game');
  });
});
