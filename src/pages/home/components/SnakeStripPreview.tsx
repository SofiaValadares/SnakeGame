import React, { FC, useEffect, useRef } from 'react';

/** Trajeto em grelha (coluna, linha) para pré-visualização estática */
const SEGMENTS: { x: number; y: number }[] = [
  { x: 2, y: 4 },
  { x: 3, y: 4 },
  { x: 4, y: 4 },
  { x: 5, y: 4 },
  { x: 6, y: 4 },
  { x: 6, y: 3 },
  { x: 6, y: 2 },
  { x: 5, y: 2 },
  { x: 4, y: 2 },
];

const CELL = 16;
const GRID_W = 10;
const GRID_H = 8;
const W = GRID_W * CELL;
const H = GRID_H * CELL;

interface SnakeStripPreviewProps {
  primaryColor: string;
  secondaryColor: string;
}

const SnakeStripPreview: FC<SnakeStripPreviewProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0d0614';
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#2a1f47';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_W; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, H);
      ctx.stroke();
    }
    for (let j = 0; j <= GRID_H; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * CELL);
      ctx.lineTo(W, j * CELL);
      ctx.stroke();
    }

    SEGMENTS.forEach((seg, i) => {
      const isHead = i === 0;
      ctx.fillStyle = i % 2 === 0 ? primaryColor : secondaryColor;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
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

    const apple = { x: 8, y: 6 };
    ctx.fillStyle = secondaryColor;
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = 6;
    ctx.fillRect(apple.x * CELL + 2, apple.y * CELL + 2, CELL - 4, CELL - 4);
    ctx.shadowBlur = 0;
  }, [primaryColor, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="snake-strip-preview__canvas"
      aria-hidden
    />
  );
};

export default SnakeStripPreview;
