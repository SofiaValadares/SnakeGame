import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SnakeThemeProvider,
  useSnakeTheme,
} from '../../context/SnakeThemeContext';

function ThemeProbe() {
  const {
    categoryIndex,
    competenceIndex,
    stripeA,
    stripeB,
    selectCategory,
    selectCompetence,
  } = useSnakeTheme();
  return (
    <div>
      <span data-testid="cat-idx">{categoryIndex}</span>
      <span data-testid="comp-idx">{competenceIndex}</span>
      <span data-testid="stripe-a">{stripeA}</span>
      <span data-testid="stripe-b">{stripeB}</span>
      <button type="button" onClick={() => selectCategory(2)}>
        pick-cat-2
      </button>
      <button type="button" onClick={() => selectCompetence(2)}>
        pick-comp-2
      </button>
    </div>
  );
}

describe('SnakeThemeProvider', () => {
  it('exposes default stripes from first category and competence', () => {
    render(
      <SnakeThemeProvider>
        <ThemeProbe />
      </SnakeThemeProvider>
    );
    expect(screen.getByTestId('cat-idx')).toHaveTextContent('0');
    expect(screen.getByTestId('comp-idx')).toHaveTextContent('0');
    expect(screen.getByTestId('stripe-a')).toHaveTextContent('#8B5CF6');
    expect(screen.getByTestId('stripe-b')).toHaveTextContent('#61DAFB');
  });

  it('resets competence index when category changes', async () => {
    render(
      <SnakeThemeProvider>
        <ThemeProbe />
      </SnakeThemeProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: /pick-comp-2/i }));
    expect(screen.getByTestId('comp-idx')).toHaveTextContent('2');
    await userEvent.click(screen.getByRole('button', { name: /pick-cat-2/i }));
    expect(screen.getByTestId('cat-idx')).toHaveTextContent('2');
    expect(screen.getByTestId('comp-idx')).toHaveTextContent('0');
    expect(screen.getByTestId('stripe-a')).toHaveTextContent('#10B981');
  });
});

describe('useSnakeTheme', () => {
  it('throws outside provider', () => {
    function Bad() {
      useSnakeTheme();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(
      /useSnakeTheme must be used within SnakeThemeProvider/
    );
  });
});
