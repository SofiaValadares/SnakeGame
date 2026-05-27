import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import SnakeGame, { SnakeGameHandle } from '../../../pages/game/components/SnakeGame';

describe('SnakeGame keyboard', () => {
  it('accepts arrow keys without canvas focus', () => {
    const ref = createRef<SnakeGameHandle>();
    render(
      <SnakeGame
        ref={ref}
        paused={false}
        primaryColor="#8B5CF6"
        secondaryColor="#61DAFB"
      />
    );

    fireEvent.keyDown(document, { code: 'ArrowUp', key: 'ArrowUp' });
    ref.current?.queueDirection('LEFT');

    fireEvent.keyDown(document, { code: 'KeyW', key: 'w' });
    expect(ref.current).toBeTruthy();
  });
});
