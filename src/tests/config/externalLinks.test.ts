import { getPortfolioUrl } from '../../config/externalLinks';

describe('getPortfolioUrl', () => {
  const key = 'REACT_APP_PORTFOLIO_URL';
  let previous: string | undefined;

  beforeEach(() => {
    previous = process.env[key];
  });

  afterEach(() => {
    if (previous === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = previous;
    }
  });

  it('returns null when the variable is undefined', () => {
    delete process.env[key];
    expect(getPortfolioUrl()).toBeNull();
  });

  it('returns null for empty or whitespace-only values', () => {
    process.env[key] = '';
    expect(getPortfolioUrl()).toBeNull();
    process.env[key] = '   \t  ';
    expect(getPortfolioUrl()).toBeNull();
  });

  it('returns trimmed URL when set', () => {
    process.env[key] = '  https://portfolio.example  ';
    expect(getPortfolioUrl()).toBe('https://portfolio.example');
  });
});
