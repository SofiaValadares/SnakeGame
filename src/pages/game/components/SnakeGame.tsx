import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface SnakeGameHandle {
  queueDirection: (dir: Direction) => void;
  reset: () => void;
}

interface Point {
  x: number;
  y: number;
}

const GRID = 20;
const CELL = 18;
const SIZE = GRID * CELL;
const TICK_MS = 135;

const INITIAL_DIR: Direction = 'RIGHT';

function sameCell(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function randomApple(occupied: Point[]): Point {
  const set = new Set(occupied.map((p) => `${p.x},${p.y}`));
  let p: Point;
  let guard = 0;
  do {
    p = {
      x: Math.floor(Math.random() * GRID),
      y: Math.floor(Math.random() * GRID),
    };
    guard += 1;
  } while (set.has(`${p.x},${p.y}`) && guard < 999);
  return p;
}

function initialSnake(): Point[] {
  const cx = Math.floor(GRID / 2);
  const cy = Math.floor(GRID / 2);
  return [
    { x: cx, y: cy },
    { x: cx - 1, y: cy },
    { x: cx - 2, y: cy },
  ];
}

function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === 'UP' && b === 'DOWN') ||
    (a === 'DOWN' && b === 'UP') ||
    (a === 'LEFT' && b === 'RIGHT') ||
    (a === 'RIGHT' && b === 'LEFT')
  );
}

function stepHead(head: Point, dir: Direction): Point {
  switch (dir) {
    case 'UP':
      return { x: head.x, y: head.y - 1 };
    case 'DOWN':
      return { x: head.x, y: head.y + 1 };
    case 'LEFT':
      return { x: head.x - 1, y: head.y };
    case 'RIGHT':
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
}

export interface SnakeGameProps {
  paused: boolean;
  /** Listra nos índices pares (cabeça = par) — cor da categoria */
  stripeA: string;
  /** Listra nos índices ímpares — cor da competência */
  stripeB: string;
  onScore?: (score: number) => void;
  onGameOver?: (over: boolean) => void;
}

const SnakeGame = forwardRef<SnakeGameHandle, SnakeGameProps>(
  function SnakeGame({ paused, stripeA, stripeB, onScore, onGameOver }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const snakeRef = useRef<Point[]>(initialSnake());
    const dirRef = useRef<Direction>(INITIAL_DIR);
    const pendingDirRef = useRef<Direction | null>(null);
    const appleRef = useRef<Point>(randomApple(initialSnake()));
    const applesEatenRef = useRef(0);
    const gameOverRef = useRef(false);

    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const snake = snakeRef.current;
      const apple = appleRef.current;

      ctx.fillStyle = '#0d0614';
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.strokeStyle = '#2a1f47';
      ctx.lineWidth = 1;
      for (let i = 0; i <= GRID; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL, 0);
        ctx.lineTo(i * CELL, SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL);
        ctx.lineTo(SIZE, i * CELL);
        ctx.stroke();
      }

      ctx.fillStyle = '#ff3344';
      ctx.shadowColor = '#ff6b7a';
      ctx.shadowBlur = 8;
      ctx.fillRect(apple.x * CELL + 2, apple.y * CELL + 2, CELL - 4, CELL - 4);
      ctx.shadowBlur = 0;

      snake.forEach((seg, i) => {
        const isHead = i === 0;
        ctx.fillStyle = i % 2 === 0 ? stripeA : stripeB;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 2;
        const pad = isHead ? 1 : 2;
        ctx.fillRect(
          seg.x * CELL + pad,
          seg.y * CELL + pad,
          CELL - pad * 2,
          CELL - pad * 2
        );
        ctx.strokeRect(
          seg.x * CELL + pad,
          seg.y * CELL + pad,
          CELL - pad * 2,
          CELL - pad * 2
        );
      });
    }, [stripeA, stripeB]);

    const resetInternal = useCallback(() => {
      snakeRef.current = initialSnake();
      dirRef.current = INITIAL_DIR;
      pendingDirRef.current = null;
      appleRef.current = randomApple(snakeRef.current);
      applesEatenRef.current = 0;
      gameOverRef.current = false;
      onScore?.(0);
      onGameOver?.(false);
      draw();
    }, [draw, onGameOver, onScore]);

    useImperativeHandle(
      ref,
      () => ({
        queueDirection: (next: Direction) => {
          if (gameOverRef.current) return;
          const current = dirRef.current;
          if (!isOpposite(current, next)) {
            pendingDirRef.current = next;
          }
        },
        reset: resetInternal,
      }),
      [resetInternal]
    );

    useEffect(() => {
      draw();
    }, [draw]);

    useEffect(() => {
      const tick = () => {
        if (paused || gameOverRef.current) return;

        const pending = pendingDirRef.current;
        if (pending !== null && !isOpposite(dirRef.current, pending)) {
          dirRef.current = pending;
        }
        pendingDirRef.current = null;

        const snake = snakeRef.current;
        const head = snake[0];
        const dir = dirRef.current;
        const newHead = stepHead(head, dir);

        if (
          newHead.x < 0 ||
          newHead.x >= GRID ||
          newHead.y < 0 ||
          newHead.y >= GRID
        ) {
          gameOverRef.current = true;
          onGameOver?.(true);
          draw();
          return;
        }

        if (snake.some((s) => sameCell(s, newHead))) {
          gameOverRef.current = true;
          onGameOver?.(true);
          draw();
          return;
        }

        const ate = sameCell(newHead, appleRef.current);
        const nextSnake = [newHead, ...snake];
        if (!ate) {
          nextSnake.pop();
        } else {
          applesEatenRef.current += 1;
          onScore?.(applesEatenRef.current);
          appleRef.current = randomApple(nextSnake);
        }
        snakeRef.current = nextSnake;
        draw();
      };

      const id = window.setInterval(tick, TICK_MS);
      return () => window.clearInterval(id);
    }, [paused, draw, onGameOver, onScore]);

    useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (gameOverRef.current) {
          if (e.code === 'Space' || e.code === 'Enter') {
            e.preventDefault();
            resetInternal();
          }
          return;
        }
        const map: Record<string, Direction> = {
          ArrowUp: 'UP',
          ArrowDown: 'DOWN',
          ArrowLeft: 'LEFT',
          ArrowRight: 'RIGHT',
          KeyW: 'UP',
          KeyS: 'DOWN',
          KeyA: 'LEFT',
          KeyD: 'RIGHT',
        };
        const dir = map[e.code];
        if (dir) {
          e.preventDefault();
          const current = dirRef.current;
          if (!isOpposite(current, dir)) {
            pendingDirRef.current = dir;
          }
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [resetInternal]);

    const onCanvasClick = () => {
      canvasRef.current?.focus();
      if (gameOverRef.current) {
        resetInternal();
      }
    };

    return (
      <canvas
        ref={canvasRef}
        role="application"
        aria-label="Jogo Snake"
        tabIndex={0}
        width={SIZE}
        height={SIZE}
        className="snake-canvas"
        onClick={onCanvasClick}
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  }
);

export default SnakeGame;
