// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/** jsdom não implementa canvas; evita erros nos testes com pré-visualizações em canvas */
const mock2d = {
  fillRect: jest.fn(),
  fillStyle: '',
  strokeRect: jest.fn(),
  strokeStyle: '',
  lineWidth: 1,
  shadowBlur: 0,
  shadowColor: '',
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
};
HTMLCanvasElement.prototype.getContext = function (
  this: HTMLCanvasElement,
  type: string
) {
  return type === '2d' ? (mock2d as unknown as CanvasRenderingContext2D) : null;
};
