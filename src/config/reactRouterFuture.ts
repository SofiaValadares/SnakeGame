/**
 * Opt-in às mudanças previstas no React Router v7 — remove warnings nos testes e em dev.
 * @see https://reactrouter.com/v6/upgrading/future
 */
export const reactRouterFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
