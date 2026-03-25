/**
 * URL do portefólio: cria `.env` com REACT_APP_PORTFOLIO_URL=https://...
 * Ex.: REACT_APP_PORTFOLIO_URL=https://tudominio.com
 */
export function getPortfolioUrl(): string | null {
  const raw = process.env.REACT_APP_PORTFOLIO_URL?.trim();
  return raw && raw.length > 0 ? raw : null;
}
