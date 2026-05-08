import {
  CANVAS_H, CANVAS_W,
  COL_BG, COL_FLOOR_LOWER, COL_FLOOR_UPPER, COL_WALL,
  COL_DOOR_NORMAL, COL_DOOR_BULLET, COL_DOOR_ARMS,
  DOOR_W, DOOR_H,
  FLOOR_Y_LOWER, FLOOR_Y_UPPER,
} from '../constants.js';
import { camera } from '../camera.js';

const DOOR_FACE = { normal: COL_DOOR_NORMAL, bullet: COL_DOOR_BULLET, arms: COL_DOOR_ARMS };

// Warning lights blink on a 60-frame cycle
let tick = 0;

function f(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x, y, w, h);
}

export function drawLevel(ctx, platforms, doors) {
  tick++;
  const lightsOn = Math.floor(tick / 30) % 2 === 0;

  // Panel seams repeat every 48 world-px; offset by camera so they scroll.
  // Lights repeat every 96 world-px.
  const off48 = Math.round(camera.x % 48);
  const off96  = Math.round(camera.x % 96);

  // ── Full canvas base ───────────────────────────────────────────────────────
  f(ctx, 0, 0, CANVAS_W, CANVAS_H, COL_BG);

  // ── Upper wall (solid steel-blue structure, y=0 to FLOOR_Y_UPPER) ──────────
  f(ctx, 0, 0, CANVAS_W, FLOOR_Y_UPPER, COL_WALL);

  // Overhead cable run along the ceiling
  f(ctx, 0, 3, CANVAS_W, 6, '#253a50');
  f(ctx, 0, 3, CANVAS_W, 1, '#3a5568'); // top highlight
  f(ctx, 0, 9, CANVAS_W, 1, '#111e2e'); // bottom shadow

  // Horizontal panel seam lines
  for (let py = 14; py < FLOOR_Y_UPPER - 2; py += 14) {
    f(ctx, 0, py,     CANVAS_W, 1, '#111d2c');
    f(ctx, 0, py + 1, CANVAS_W, 1, '#213348');
  }

  // Vertical panel seams + rivets (world-scrolling)
  for (let px = -off48; px < CANVAS_W + 48; px += 48) {
    const sx = Math.round(px);
    f(ctx, sx,     10, 2, FLOOR_Y_UPPER - 10, '#0f1a28'); // seam
    f(ctx, sx - 1, 10, 4, 3, '#405060');                  // rivet top
    f(ctx, sx - 1, FLOOR_Y_UPPER - 9, 4, 3, '#405060');   // rivet bottom
  }

  // ── Warning lights (world-scrolling, blink) ────────────────────────────────
  for (let px = -off96; px < CANVAS_W + 96; px += 96) {
    const lx = Math.round(px) + 4;
    f(ctx, lx,     14, 10, 6, '#1a0a0a');                             // housing
    f(ctx, lx + 1, 15,  8, 4, '#2e1010');                             // housing face
    f(ctx, lx + 2, 16,  6, 3, lightsOn ? '#dd2424' : '#4a1010');     // lens
    if (lightsOn) {
      f(ctx, lx + 2, 16, 3, 1, '#ff5050');                            // hot spot
    }
  }

  // Structural beam at base of upper wall
  f(ctx, 0, FLOOR_Y_UPPER - 7, CANVAS_W, 7, '#1e3045');
  f(ctx, 0, FLOOR_Y_UPPER - 7, CANVAS_W, 1, '#304e65'); // beam top highlight
  f(ctx, 0, FLOOR_Y_UPPER - 1, CANVAS_W, 1, '#0e1e2e'); // beam bottom shadow

  // ── Open corridor between walkways ─────────────────────────────────────────
  f(ctx, 0, FLOOR_Y_UPPER, CANVAS_W, FLOOR_Y_LOWER - FLOOR_Y_UPPER, '#0f1922');

  // Faint continuation panel lines in back wall
  for (let py = FLOOR_Y_UPPER + 7; py < FLOOR_Y_LOWER - 2; py += 14) {
    f(ctx, 0, py, CANVAS_W, 1, '#0a1420');
  }

  // Horizontal conduit pipe mid-corridor
  const midY = FLOOR_Y_UPPER + Math.floor((FLOOR_Y_LOWER - FLOOR_Y_UPPER) / 2);
  f(ctx, 0, midY - 1, CANVAS_W, 5, '#243648');
  f(ctx, 0, midY - 1, CANVAS_W, 1, '#344c60'); // pipe top highlight
  f(ctx, 0, midY + 4, CANVAS_W, 1, '#121e2c'); // pipe bottom shadow

  // ── Platforms ─────────────────────────────────────────────────────────────
  for (const p of platforms) {
    if (!camera.visible(p.x, p.y, p.w, p.h)) continue;
    const sx = camera.toScreenX(p.x);
    const sy = p.y; // no vertical scroll

    if (p.y === FLOOR_Y_LOWER) {
      // Lower corridor floor — heavy steel plates
      f(ctx, sx, sy, p.w, p.h, COL_FLOOR_LOWER);

      // Safety/warning edge stripe
      f(ctx, sx, sy,     p.w, 1, '#dd8800'); // amber highlight
      f(ctx, sx, sy + 1, p.w, 1, '#994400'); // amber body

      // Steel plate seams (every 32px)
      for (let ox = 0; ox < p.w; ox += 32) {
        f(ctx, sx + ox, sy + 2, 1, p.h - 2, '#262e38');
      }

      // Shallow surface grooves
      for (let oy = 7; oy < p.h; oy += 8) {
        f(ctx, sx, sy + oy, p.w, 1, '#2e3840');
      }
    } else {
      // Upper catwalk — grated steel
      f(ctx, sx, sy, p.w, p.h, COL_FLOOR_UPPER);

      // Top surface highlight
      f(ctx, sx, sy, p.w, 1, '#3a5260');

      // Grating slits
      for (let oy = 2; oy < p.h - 1; oy += 3) {
        f(ctx, sx, sy + oy, p.w, 1, '#182434');
      }

      // Underside shadow
      f(ctx, sx, sy + p.h - 1, p.w, 1, '#16202e');
    }
  }

  // ── Doors ─────────────────────────────────────────────────────────────────
  for (const d of doors) {
    if (!camera.visible(d.x, d.y, DOOR_W, DOOR_H)) continue;
    const sx = Math.round(camera.toScreenX(d.x));
    const sy = d.y;

    // Industrial frame (all door states share the frame)
    const frameCol = '#2a3c52';
    f(ctx, sx - 2, sy - 2, 2,          DOOR_H + 4, frameCol); // left jamb
    f(ctx, sx + DOOR_W, sy - 2, 2,     DOOR_H + 4, frameCol); // right jamb
    f(ctx, sx - 2, sy - 2, DOOR_W + 4, 2,          frameCol); // lintel
    f(ctx, sx - 2, sy + DOOR_H, DOOR_W + 4, 2,     frameCol); // threshold

    // Frame rivets at four corners
    const rCol = '#4a6078';
    f(ctx, sx - 2,          sy - 2,         3, 3, rCol);
    f(ctx, sx + DOOR_W - 1, sy - 2,         3, 3, rCol);
    f(ctx, sx - 2,          sy + DOOR_H - 1, 3, 3, rCol);
    f(ctx, sx + DOOR_W - 1, sy + DOOR_H - 1, 3, 3, rCol);

    if (d.open) {
      // Dark interior when open
      f(ctx, sx, sy, DOOR_W, DOOR_H, '#060a0e');
      // Light-spill strips at edges
      f(ctx, sx,              sy, 2, DOOR_H, '#1a2030');
      f(ctx, sx + DOOR_W - 2, sy, 2, DOOR_H, '#1a2030');

    } else if (d.used) {
      // Spent — dim, no indicator
      f(ctx, sx, sy, DOOR_W, DOOR_H, '#18222e');
      f(ctx, sx, sy, DOOR_W, 1, '#222c3c');
      // Dead indicator
      f(ctx, sx + DOOR_W / 2 - 2, sy + 5, 4, 3, '#2a0e0e');

    } else {
      // Closed — type-colored face
      f(ctx, sx, sy, DOOR_W, DOOR_H, DOOR_FACE[d.type]);

      // Panel edge bevel
      f(ctx, sx,              sy,     1, DOOR_H, 'rgba(255,255,255,0.10)');
      f(ctx, sx,              sy,     DOOR_W, 1, 'rgba(255,255,255,0.10)');
      f(ctx, sx + DOOR_W - 1, sy,     1, DOOR_H, 'rgba(0,0,0,0.35)');
      f(ctx, sx,              sy + DOOR_H - 1, DOOR_W, 1, 'rgba(0,0,0,0.35)');

      // Status indicator light
      const ind = d.type === 'bullet' ? '#2090ff'
                : d.type === 'arms'   ? '#ff8020'
                :                       '#30cc40';
      f(ctx, sx + DOOR_W / 2 - 2, sy + 5, 4, 3, ind);
      f(ctx, sx + DOOR_W / 2 - 2, sy + 5, 2, 1, 'rgba(255,255,255,0.5)'); // glint

      // Pickup label (B or A only)
      const label = d.type === 'bullet' ? 'B' : d.type === 'arms' ? 'A' : '';
      if (label) {
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.font = '5px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, sx + DOOR_W / 2, sy + DOOR_H - 5);
      }
    }
  }

  ctx.textAlign = 'left';
}
