import { COLOR_PRESETS, isPresetColor } from '../../config/colorPresets';

describe('colorPresets', () => {
  it('exposes four preset colors', () => {
    expect(COLOR_PRESETS).toHaveLength(4);
  });

  it('detects preset colors case-insensitively', () => {
    expect(isPresetColor('#8B5CF6')).toBe(true);
    expect(isPresetColor('#8b5cf6')).toBe(true);
    expect(isPresetColor('#123456')).toBe(false);
  });
});
