export const HIGH_SCORE_STORAGE_KEY = 'snakegame-high-score';
export const HIGH_SCORE_DOM_ATTR = 'data-snake-high-score';

function parseScore(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null;
  const value = parseInt(raw, 10);
  return Number.isFinite(value) && value >= 0 ? value : null;
}

function applyToDom(score: number): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(HIGH_SCORE_DOM_ATTR, String(score));
}

export function readHighScore(): number {
  let fromStorage: number | null = null;
  try {
    fromStorage = parseScore(localStorage.getItem(HIGH_SCORE_STORAGE_KEY));
  } catch {
    /* localStorage indisponível */
  }

  if (fromStorage != null) {
    applyToDom(fromStorage);
    return fromStorage;
  }

  if (typeof document !== 'undefined') {
    const fromDom = parseScore(
      document.documentElement.getAttribute(HIGH_SCORE_DOM_ATTR)
    );
    if (fromDom != null) {
      try {
        localStorage.setItem(HIGH_SCORE_STORAGE_KEY, String(fromDom));
      } catch {
        /* sync opcional */
      }
      return fromDom;
    }
  }

  return 0;
}

export function writeHighScore(score: number): void {
  const value = Math.max(0, score);
  const text = String(value);
  try {
    localStorage.setItem(HIGH_SCORE_STORAGE_KEY, text);
  } catch {
    /* localStorage indisponível */
  }
  applyToDom(value);
}

export function updateHighScoreIfHigher(score: number): number {
  const current = readHighScore();
  if (score > current) {
    writeHighScore(score);
    return score;
  }
  return current;
}
