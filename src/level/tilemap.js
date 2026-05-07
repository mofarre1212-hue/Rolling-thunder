import {
  CANVAS_H, CANVAS_W,
  COL_BG, COL_FLOOR_LOWER, COL_FLOOR_UPPER, COL_WALL,
  COL_DOOR_NORMAL, COL_DOOR_BULLET, COL_DOOR_ARMS,
  DOOR_W, DOOR_H,
  FLOOR_Y_LOWER, FLOOR_Y_UPPER
} from '../constants.js';
import { camera } from '../camera.js';

const DOOR_COLORS = {
  normal: COL_DOOR_NORMAL,
  bullet: COL_DOOR_BULLET,
  arms:   COL_DOOR_ARMS,
};

export function drawLevel(ctx, platforms, doors) {
  // Background fill
  ctx.fillStyle = COL_BG;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // Upper wall — gray industrial panels
  ctx.fillStyle = COL_WALL;
  ctx.fillRect(0, 0, CANVAS_W, FLOOR_Y_UPPER - 4);

  // Louvered horizontal panel lines on upper wall
  ctx.fillStyle = '#383844';
  for (let py = 5; py < FLOOR_Y_UPPER - 6; py += 9) {
    ctx.fillRect(0, py, CANVAS_W, 2);
  }

  // Vertical panel dividers on upper wall
  ctx.fillStyle = '#3e3e4a';
  for (let px = 48; px < CANVAS_W; px += 48) {
    ctx.fillRect(px, 0, 1, FLOOR_Y_UPPER - 4);
  }

  // Mid-wall — between upper and lower floor
  ctx.fillStyle = '#484454';
  ctx.fillRect(0, FLOOR_Y_UPPER - 4, CANVAS_W, FLOOR_Y_LOWER - FLOOR_Y_UPPER + 4);

  // Louvered lines on mid-wall
  ctx.fillStyle = '#343040';
  for (let py = FLOOR_Y_UPPER + 3; py < FLOOR_Y_LOWER - 4; py += 9) {
    ctx.fillRect(0, py, CANVAS_W, 2);
  }

  // Platforms
  for (const p of platforms) {
    const sx = camera.toScreenX(p.x);
    const sy = camera.toScreenY(p.y);
    if (!camera.visible(p.x, p.y, p.w, p.h)) continue;

    ctx.fillStyle = p.y === FLOOR_Y_LOWER ? COL_FLOOR_LOWER : COL_FLOOR_UPPER;
    ctx.fillRect(sx, sy, p.w, p.h);

    // Ledge highlight edge
    ctx.fillStyle = p.y === FLOOR_Y_LOWER ? '#00c0c0' : '#009090';
    ctx.fillRect(sx, sy, p.w, 2);
  }

  // Doors
  for (const d of doors) {
    if (!camera.visible(d.x, d.y, DOOR_W, DOOR_H)) continue;
    const sx = camera.toScreenX(d.x);
    const sy = camera.toScreenY(d.y);

    // Door frame
    ctx.fillStyle = '#222';
    ctx.fillRect(sx - 1, sy - 1, DOOR_W + 2, DOOR_H + 2);

    if (d.open) {
      // Open doorway: dark interior with a thin lit edge on each side
      ctx.fillStyle = '#080808';
      ctx.fillRect(sx, sy, DOOR_W, DOOR_H);
      ctx.fillStyle = '#3a3020';
      ctx.fillRect(sx, sy, 2, DOOR_H);
      ctx.fillRect(sx + DOOR_W - 2, sy, 2, DOOR_H);
    } else if (d.used) {
      // Spent / empty door — dark, no label
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(sx, sy, DOOR_W, DOOR_H);
    } else {
      // Closed door: colored face
      ctx.fillStyle = DOOR_COLORS[d.type];
      ctx.fillRect(sx, sy, DOOR_W, DOOR_H);

      // Highlight stripe
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(sx + 2, sy + 2, DOOR_W - 4, 4);

      // Pickup label (B / A only — normal doors have no label)
      const label = d.type === 'bullet' ? 'B' : d.type === 'arms' ? 'A' : '';
      if (label) {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '5px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, sx + DOOR_W / 2, sy + DOOR_H - 6);
      }
    }
  }

  ctx.textAlign = 'left';
}
