import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DEFAULT_PRIMARY_COLOR,
  DEFAULT_SECONDARY_COLOR,
  SnakeThemeProvider,
  useSnakeTheme,
} from '../../context/SnakeThemeContext';

function ThemeProbe() {
  const {
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
  } = useSnakeTheme();
  return (
    <div>
      <span data-testid="primary">{primaryColor}</span>
      <span data-testid="secondary">{secondaryColor}</span>
      <button type="button" onClick={() => setPrimaryColor('#ff0000')}>
        set-primary
      </button>
      <button type="button" onClick={() => setSecondaryColor('#00ff00')}>
        set-secondary
      </button>
    </div>
  );
}

describe('SnakeThemeProvider', () => {
  it('exposes default primary and secondary colors', () => {
    render(
      <SnakeThemeProvider>
        <ThemeProbe />
      </SnakeThemeProvider>
    );
    expect(screen.getByTestId('primary')).toHaveTextContent(
      DEFAULT_PRIMARY_COLOR
    );
    expect(screen.getByTestId('secondary')).toHaveTextContent(
      DEFAULT_SECONDARY_COLOR
    );
  });

  it('updates colors independently', async () => {
    render(
      <SnakeThemeProvider>
        <ThemeProbe />
      </SnakeThemeProvider>
    );
    await userEvent.click(screen.getByRole('button', { name: /set-primary/i }));
    expect(screen.getByTestId('primary')).toHaveTextContent('#ff0000');
    expect(screen.getByTestId('secondary')).toHaveTextContent(
      DEFAULT_SECONDARY_COLOR
    );
    await userEvent.click(
      screen.getByRole('button', { name: /set-secondary/i })
    );
    expect(screen.getByTestId('secondary')).toHaveTextContent('#00ff00');
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
