# Snake Arcade

Jogo **Snake** em React com estética **retro / arcade**. Escolhe as cores da cobra no menu, joga no tabuleiro e tenta bater o teu recorde.

## Demo (deploy)

**[https://snakearcade.sofiavcav.dev/](https://snakearcade.sofiavcav.dev/)**

## Funcionalidades

- **Menu inicial**: cor **primária** e **secundária** com pré-visualização (listras + maçã).
- **Jogo Snake**: maçãs, crescimento, colisão com paredes e com o próprio corpo.
- **Visual**: listras alternadas; a **maçã** usa a cor secundária.
- **Pontuação e recorde**: pontuação da partida e melhor resultado guardado no navegador (`localStorage` + atributo `data-snake-high-score` no `<html>`).
- **Controlos**: teclado (setas / WASD), setas no ecrã, pausa e novo jogo.
- **Cores**: 4 presets por slot + **Criar cor** com seletor personalizado.
- **Layout do jogo**: tabuleiro e painel de comandos em duas colunas (empilham em ecrãs estreitos).

## Tecnologias

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) 6
- [Create React App](https://create-react-app.dev/) (`react-scripts` 5)

## Como executar

Requisitos: **Node.js** (recomendado 18 ou superior).

```bash
npm install
npm start
```

A aplicação abre em [http://localhost:3000](http://localhost:3000).

Outros comandos:

```bash
npm run build   # produção → pasta build/
npm test        # testes interativos
CI=true npm test -- --watchAll=false   # uma corrida (CI)
```

### Testes

Ficheiros `*.test.ts(x)` em **`src/tests/`**:

| Ficheiro | Conteúdo |
|----------|----------|
| `App.test.tsx` | Rotas e navegação |
| `config/colorPresets.test.ts` | Presets de cor |
| `context/SnakeThemeContext.test.tsx` | Cores primária/secundária |
| `pages/home/Home.test.tsx` | Seletores de cor, link Jogar |
| `pages/game/Game.test.tsx` | Tabuleiro, recorde, comandos, pausa |
| `pages/game/SnakeGame.keyboard.test.tsx` | Teclado |
| `utils/highScore.test.ts` | Persistência do recorde |

O Jest usa `src/setupTests.ts` (mock de `canvas.getContext('2d')`). As flags `future` do React Router estão em `src/config/reactRouterFuture.ts`.

## Personalizar

1. **Cores** — `src/config/colorPresets.ts` e tema em `src/context/SnakeThemeContext.tsx`.
2. **Textos e meta** — `public/index.html`, `public/manifest.json`, `src/pages/`.
3. **Design system** — `src/design-system/`.

## Estrutura (resumo)

```
src/
  config/            # presets e router
  context/           # tema da cobra (cores)
  design-system/     # tokens e componentes CSS
  pages/
    home/            # menu e seleção de cores
    game/            # Snake, scoreboard e comandos
  utils/             # recorde (localStorage + DOM)
```

## Licença e uso

Projeto pessoal aberto à reutilização. Adapta conteúdo e créditos às tuas regras.

