# Snake Arcade

Projeto em React com estética **retro / arcade**, inspirado em jogos clássicos. A cobra tem **listras** nas cores que escolheres com base em **categorias** e **competências** — uma forma divertida de mostrar habilidades em vez de só listá-las.

No futuro, este projeto será ligado ao **meu portfólio**. O código é pensado para que **qualquer pessoa** possa reutilizá-lo no **próprio portfólio**: basta ajustar categorias, competências e, quando quiseres, a URL de retorno ao teu site.

## Funcionalidades

- **Menu inicial**: três colunas — categorias à esquerda, pré-visualização da cobra ao centro, competências da categoria selecionada à direita. A categoria *Desenvolvimento Web/Mobile* vem selecionada por defeito.
- **Jogo Snake** tradicional (maçã, crescimento, colisão com paredes e com o próprio corpo).
- **Personalização visual**: cada segmento da cobra alterna entre a cor da categoria e da competência escolhidas.
- **Controlos**: teclado (setas / WASD), botões no ecrã e pausa; ligação opcional ao portfólio via variável de ambiente.
- **Layout**: conteúdo pensado para caber na viewport; scroll local só nas listas e no painel lateral do jogo, quando necessário.

## Tecnologias

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) 6
- [Create React App](https://create-react-app.dev/) (`react-scripts` 5)

## Como executar

Requisitos: **Node.js** (recomendado 18 ou superior para alinhar com as dependências atuais).

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

### Testes unitários / integração leve

Todos os ficheiros `*.test.ts(x)` estão em **`src/tests/`**, espelhando a estrutura do código:

```
src/tests/
  App.test.tsx
  config/externalLinks.test.ts
  context/SnakeThemeContext.test.tsx
  models/CategoryModel.test.ts
  pages/
    home/Home.test.tsx
    game/Game.test.tsx
```

| Ficheiro | Conteúdo |
|----------|----------|
| `src/tests/config/externalLinks.test.ts` | `getPortfolioUrl` e `REACT_APP_PORTFOLIO_URL` |
| `src/tests/models/CategoryModel.test.ts` | Integridade de `CategorysList` |
| `src/tests/context/SnakeThemeContext.test.tsx` | Tema, mudança de categoria, hook fora do provider |
| `src/tests/pages/home/Home.test.tsx` | Menu inicial, categorias, link Jogar |
| `src/tests/pages/game/Game.test.tsx` | Jogo, painel, pausa, portfólio, menu |
| `src/tests/App.test.tsx` | Rotas e navegação |

O Jest (CRA) continua a usar `src/setupTests.ts`, incluindo mock mínimo de `canvas.getContext('2d')` para jsdom. As flags `future` do React Router v7 estão em `src/config/reactRouterFuture.ts` e são aplicadas no `BrowserRouter` e nos `MemoryRouter` dos testes, para não aparecerem avisos de deprecação na consola.

## Portfólio (opcional)

No ecrã de jogo, o botão **Portfólio** só fica ativo se existir URL configurada. Cria um ficheiro `.env` na raiz do projeto:

```env
REACT_APP_PORTFOLIO_URL=https://teu-dominio.com
```

Reinicia o `npm start` depois de alterar o `.env`. O valor é lido em `src/config/externalLinks.ts`.

## Personalizar para o teu portfólio

1. **Categorias e competências**  
   Edita `src/models/CategoryModel.ts`, `src/enums/CategoryEnum.ts` e `src/enums/CompetenceEnum.ts` para refletir as tuas áreas e stacks.

2. **Cores**  
   Cada categoria e competência tem uma cor associada no modelo; são usadas nas listras da cobra e na UI.

3. **Textos e meta**  
   Ajusta títulos em `public/index.html`, `public/manifest.json` e nos componentes em `src/pages/` conforme a tua marca.

4. **Design system**  
   Tokens e componentes visuais estão em `src/design-system/`.

## Estrutura (resumo)

```
src/
  context/           # tema da cobra (cores por categoria/competência)
  design-system/     # CSS: tokens, base, componentes
  pages/
    home/            # menu e seleção
    game/            # Snake + painel de controlos
  models/            # categorias, competências
  enums/
```

## Licença e uso

Este repositório é um projeto pessoal aberto à reutilização. Se integrares no teu portfólio, referencia a origem se fizer sentido para ti e adapta conteúdo e créditos às tuas regras.

---

*Boa sorte a quem quiser transformar um snake num cartão de visitas jogável.*
