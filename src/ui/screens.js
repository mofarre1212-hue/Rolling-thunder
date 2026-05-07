import { CANVAS_W, CANVAS_H } from '../constants.js';

function overlay(ctx, alpha = 0.7) {
  ctx.fillStyle = `rgba(0,0,0,${alpha})`;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

function centeredText(ctx, text, y, size = 12, color = '#e8e8c0') {
  ctx.font = `${size}px monospace`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, CANVAS_W / 2, y);
}

export function drawTitle(ctx) {
  overlay(ctx, 0.85);
  centeredText(ctx, 'IRON  FALCON', CANVAS_H / 2 - 24, 16, '#e8e040');
  centeredText(ctx, 'Z - SHOOT   X - JUMP', CANVAS_H / 2 + 4, 8);
  centeredText(ctx, 'ARROWS - MOVE / CROUCH / ENTER DOOR', CANVAS_H / 2 + 18, 7, '#aaa');
  centeredText(ctx, 'PRESS  Z  TO  START', CANVAS_H / 2 + 38, 9, '#88ff88');
}

export function drawGameOver(ctx, score) {
  overlay(ctx);
  centeredText(ctx, 'MISSION  FAILED', CANVAS_H / 2 - 20, 14, '#ff4444');
  centeredText(ctx, `SCORE  ${score}`, CANVAS_H / 2 + 4, 10);
  centeredText(ctx, 'PRESS  Z  TO  RETRY', CANVAS_H / 2 + 24, 8, '#aaa');
}

export function drawStageClear(ctx, score) {
  overlay(ctx);
  centeredText(ctx, 'STAGE  CLEAR', CANVAS_H / 2 - 20, 14, '#44ff88');
  centeredText(ctx, `SCORE  ${score}`, CANVAS_H / 2 + 4, 10);
  centeredText(ctx, 'PRESS  Z  TO  CONTINUE', CANVAS_H / 2 + 24, 8, '#aaa');
}
