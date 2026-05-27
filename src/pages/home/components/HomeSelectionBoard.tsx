import React, { FC } from 'react';
import { useSnakeTheme } from '../../../context/SnakeThemeContext';
import ColorSlotPicker from './ColorSlotPicker';
import SnakeStripPreview from './SnakeStripPreview';

const HomeSelectionBoard: FC = () => {
  const {
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
  } = useSnakeTheme();

  return (
    <div className="home-color-picker">
      <div className="home-color-picker__preview">
        <h2 className="home-color-picker__title">A tua cobra</h2>
        <div className="snake-strip-preview">
          <SnakeStripPreview
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        </div>
        <p className="home-color-picker__legend ds-caption">
          Listras alternadas · maçã na cor secundária
        </p>
      </div>

      <div className="home-color-picker__controls">
        <ColorSlotPicker
          label="Cor primária"
          value={primaryColor}
          onChange={setPrimaryColor}
          customAriaLabel="Cor primária personalizada da cobra"
        />
        <ColorSlotPicker
          label="Cor secundária"
          value={secondaryColor}
          onChange={setSecondaryColor}
          customAriaLabel="Cor secundária personalizada da cobra e da maçã"
        />
      </div>
    </div>
  );
};

export default HomeSelectionBoard;
