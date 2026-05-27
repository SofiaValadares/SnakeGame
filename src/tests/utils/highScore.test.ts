import {
  HIGH_SCORE_DOM_ATTR,
  HIGH_SCORE_STORAGE_KEY,
  readHighScore,
  updateHighScoreIfHigher,
  writeHighScore,
} from '../../utils/highScore';

describe('highScore', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute(HIGH_SCORE_DOM_ATTR);
  });

  it('starts at zero', () => {
    expect(readHighScore()).toBe(0);
  });

  it('persists and reads the record', () => {
    writeHighScore(12);
    expect(readHighScore()).toBe(12);
    expect(localStorage.getItem(HIGH_SCORE_STORAGE_KEY)).toBe('12');
    expect(document.documentElement.getAttribute(HIGH_SCORE_DOM_ATTR)).toBe('12');
  });

  it('reads from DOM when localStorage is empty', () => {
    document.documentElement.setAttribute(HIGH_SCORE_DOM_ATTR, '8');
    expect(readHighScore()).toBe(8);
    expect(localStorage.getItem(HIGH_SCORE_STORAGE_KEY)).toBe('8');
  });

  it('updates only when score is higher', () => {
    writeHighScore(10);
    expect(updateHighScoreIfHigher(7)).toBe(10);
    expect(readHighScore()).toBe(10);
    expect(updateHighScoreIfHigher(15)).toBe(15);
    expect(readHighScore()).toBe(15);
  });
});
