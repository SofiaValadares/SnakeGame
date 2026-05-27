import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
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
  it('renders preview and four preset colors per slot', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { name: /a tua cobra/i })
    ).toBeInTheDocument();

    const primaryGroup = screen.getByRole('radiogroup', {
      name: /cor primária — cores rápidas/i,
    });
    const secondaryGroup = screen.getByRole('radiogroup', {
      name: /cor secundária — cores rápidas/i,
    });
    expect(within(primaryGroup).getAllByRole('radio')).toHaveLength(4);
    expect(within(secondaryGroup).getAllByRole('radio')).toHaveLength(4);
    expect(
      screen.getByRole('radio', { name: /cor primária #8b5cf6/i })
    ).toHaveAttribute('aria-checked', 'true');
  });

  it('applies a preset when swatch is clicked', async () => {
    renderHome();
    const green = screen.getByRole('radio', { name: /cor primária #7fff00/i });
    await userEvent.click(green);
    expect(green).toHaveAttribute('aria-checked', 'true');
  });

  it('opens custom picker and changes primary color', () => {
    renderHome();
    const createButtons = screen.getAllByRole('button', { name: /^criar cor$/i });
    fireEvent.click(createButtons[0]);
    const customInput = screen.getByLabelText(/cor primária personalizada/i);
    fireEvent.change(customInput, { target: { value: '#e34f26' } });
    expect(customInput).toHaveValue('#e34f26');
  });

  it('links to the game', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /jogar/i })).toHaveAttribute(
      'href',
      '/game'
    );
  });
});
