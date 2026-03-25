import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { reactRouterFutureFlags } from '../config/reactRouterFuture';
import App from '../App';

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter
      initialEntries={[initialPath]}
      future={reactRouterFutureFlags}
    >
      <App />
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders home with Snake title', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { level: 1, name: /snake/i })).toBeInTheDocument();
  });

  it('navigates to game when Jogar is clicked', async () => {
    renderApp('/');
    await userEvent.click(screen.getByRole('link', { name: /jogar/i }));
    expect(screen.getByText('Painel')).toBeInTheDocument();
    expect(
      screen.getByRole('application', { name: /jogo snake/i })
    ).toBeInTheDocument();
  });

  it('redirects unknown paths to home', () => {
    renderApp('/rota-inexistente');
    expect(screen.getByRole('heading', { level: 1, name: /snake/i })).toBeInTheDocument();
    expect(screen.queryByText('Painel')).not.toBeInTheDocument();
  });
});
