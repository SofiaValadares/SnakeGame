import React, { FC, useEffect, useState } from 'react';
import { COLOR_PRESETS, isPresetColor } from '../../../config/colorPresets';

interface ColorSlotPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  customAriaLabel: string;
}

const ColorSlotPicker: FC<ColorSlotPickerProps> = ({
  label,
  value,
  onChange,
  customAriaLabel,
}) => {
  const [customMode, setCustomMode] = useState(() => !isPresetColor(value));

  useEffect(() => {
    if (isPresetColor(value)) {
      setCustomMode(false);
    }
  }, [value]);

  const pickPreset = (hex: string) => {
    setCustomMode(false);
    onChange(hex);
  };

  const openCustom = () => {
    setCustomMode(true);
  };

  return (
    <div className="color-slot">
      <span className="color-slot__label">{label}</span>
      <div
        className="color-slot__presets"
        role="radiogroup"
        aria-label={`${label} — cores rápidas`}
      >
        {COLOR_PRESETS.map((hex) => {
          const selected = !customMode && value.toLowerCase() === hex.toLowerCase();
          return (
            <button
              key={hex}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${label} ${hex}`}
              className={`color-slot__swatch${
                selected ? ' color-slot__swatch--active' : ''
              }`}
              style={{ backgroundColor: hex }}
              onClick={() => pickPreset(hex)}
            />
          );
        })}
        <button
          type="button"
          className={`color-slot__custom-toggle${
            customMode ? ' color-slot__custom-toggle--active' : ''
          }`}
          aria-pressed={customMode}
          onClick={openCustom}
        >
          Criar cor
        </button>
      </div>
      {customMode && (
        <label className="color-slot__custom">
          <span className="color-slot__custom-hint ds-caption">A tua cor</span>
          <input
            type="color"
            className="color-slot__input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label={customAriaLabel}
          />
          <span className="color-slot__hex">{value}</span>
        </label>
      )}
    </div>
  );
};

export default ColorSlotPicker;
