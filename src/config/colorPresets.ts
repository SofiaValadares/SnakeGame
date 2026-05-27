/** Quatro cores rápidas + opção de cor personalizada no menu */
export const COLOR_PRESETS = [
  '#8B5CF6',
  '#61DAFB',
  '#7fff00',
  '#ff4d8d',
] as const;

export function isPresetColor(hex: string): boolean {
  const normalized = hex.toLowerCase();
  return COLOR_PRESETS.some((preset) => preset.toLowerCase() === normalized);
}
