import {
  CANVAS_H, CANVAS_W,
  COL_BG, COL_FLOOR_LOWER, COL_FLOOR_UPPER, COL_WALL,
  COL_DOOR_NORMAL, COL_DOOR_BULLET, COL_DOOR_ARMS,
  DOOR_W, DOOR_H,
  FLOOR_Y_LOWER, FLOOR_Y_UPPER,
} from '../constants.js';
import { camera } from '../camera.js';

const DOOR_FACE = { normal: COL_DOOR_NORMAL, bullet: COL_DOOR_BULLET, arms: COL_DOOR_ARMS };

let tick = 0;

function f(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x, y, w, h);
}

// ── Background + platforms + doors ────────────────────────────────────────────
export function drawLevel(ctx, platforms, doors) {
  tick++;
  const lightsOn  = Math.floor(tick / 30) % 2 === 0;
  const off48  = Math.round(camera.x % 48);
  const off96  = Math.round(camera.x % 96);
  const off128 = Math.round(camera.x % 128);

  // Full canvas base
  f(ctx, 0, 0, CANVAS_W, CANVAS_H, COL_BG);

  // ── Upper wall ─────────────────────────────────────────────────────────────
  f(ctx, 0, 0, CANVAS_W, FLOOR_Y_UPPER, COL_WALL);

  // Ceiling cable run
  f(ctx, 0, 3, CANVAS_W, 6, '#253a50');
  f(ctx, 0, 3, CANVAS_W, 1, '#3a5568');
  f(ctx, 0, 9, CANVAS_W, 1, '#111e2e');

  // Horizontal panel seam lines
  for (let py = 14; py < FLOOR_Y_UPPER - 2; py += 14) {
    f(ctx, 0, py,     CANVAS_W, 1, '#111d2c');
    f(ctx, 0, py + 1, CANVAS_W, 1, '#21334a');
  }

  // Vertical panel seams + rivets (world-scrolling)
  for (let px = -off48; px < CANVAS_W + 48; px += 48) {
    const sx = Math.round(px);
    f(ctx, sx,     10, 2, FLOOR_Y_UPPER - 10, '#0d1825');
    f(ctx, sx - 1, 10, 4, 3, '#405060');                // top rivet
    f(ctx, sx - 1, FLOOR_Y_UPPER - 9, 4, 3, '#405060'); // bottom rivet
  }

  // Wall console panels (world-scrolling, every 128px)
  for (let px = -off128; px < CANVAS_W + 128; px += 128) {
    const cx = Math.round(px) + 20;
    // Panel housing
    f(ctx, cx,     20, 20, 24, '#18283a');
    f(ctx, cx,     20, 20,  1, '#2a4058'); // top edge
    f(ctx, cx,     20,  1, 24, '#2a4058'); // left edge
    f(ctx, cx + 19,20,  1, 24, '#0e1a26'); // right shadow
    f(ctx, cx,     43, 20,  1, '#0e1a26'); // bottom shadow
    // Screen/display area
    f(ctx, cx + 2, 22, 16, 10, '#0a1830');
    f(ctx, cx + 2, 22, 16,  1, '#204060'); // screen top edge
    // Fake scan lines on screen
    f(ctx, cx + 3, 24, 14,  1, '#102848');
    f(ctx, cx + 3, 26, 14,  1, '#102848');
    f(ctx, cx + 3, 28, 14,  1, '#102848');
    // Status lights
    f(ctx, cx + 3, 34,  3,  3, lightsOn ? '#20cc40' : '#0a3014'); // green OK
    f(ctx, cx + 8, 34,  3,  3, '#cc2020');                        // red alert (always on)
    f(ctx, cx + 3, 34,  1,  1, lightsOn ? '#80ff80' : '#0a3014'); // glint
    f(ctx, cx + 8, 34,  1,  1, '#ff6060');                        // glint
    // Knobs row
    f(ctx, cx + 3, 39,  2,  2, '#30404a');
    f(ctx, cx + 7, 39,  2,  2, '#30404a');
    f(ctx, cx + 11,39,  2,  2, '#30404a');
  }

  // Warning lights (world-scrolling, every 96px)
  for (let px = -off96; px < CANVAS_W + 96; px += 96) {
    const lx = Math.round(px) + 4;
    f(ctx, lx,     14, 10, 6, '#1a0a0a');
    f(ctx, lx + 1, 15,  8, 4, '#2e1010');
    f(ctx, lx + 2, 16,  6, 3, lightsOn ? '#dd2424' : '#4a1010');
    if (lightsOn) f(ctx, lx + 2, 16, 3, 1, '#ff5050');
  }

  // Structural beam at base of upper wall
  f(ctx, 0, FLOOR_Y_UPPER - 7, CANVAS_W, 7, '#1e3045');
  f(ctx, 0, FLOOR_Y_UPPER - 7, CANVAS_W, 1, '#304e65');
  f(ctx, 0, FLOOR_Y_UPPER - 1, CANVAS_W, 1, '#0e1e2e');

  // ── Open corridor ──────────────────────────────────────────────────────────
  f(ctx, 0, FLOOR_Y_UPPER, CANVAS_W, FLOOR_Y_LOWER - FLOOR_Y_UPPER, '#0d1820');

  // Faint back-wall panel lines
  for (let py = FLOOR_Y_UPPER + 7; py < FLOOR_Y_LOWER - 2; py += 14) {
    f(ctx, 0, py, CANVAS_W, 1, '#091218');
  }

  // Horizontal conduit pipe mid-corridor
  const midY = FLOOR_Y_UPPER + Math.floor((FLOOR_Y_LOWER - FLOOR_Y_UPPER) / 2);
  f(ctx, 0, midY - 1, CANVAS_W, 5, '#243648');
  f(ctx, 0, midY - 1, CANVAS_W, 1, '#344c60');
  f(ctx, 0, midY + 4, CANVAS_W, 1, '#121e2c');
  // Pipe flange clamps (world-scrolling, every 64px)
  const off64 = Math.round(camera.x % 64);
  for (let px = -off64; px < CANVAS_W + 64; px += 64) {
    const fx = Math.round(px);
    f(ctx, fx - 1, midY - 2, 4, 8, '#2a3c50');
    f(ctx, fx,     midY - 2, 2, 1, '#3a5060');
  }

  // ── Platforms ─────────────────────────────────────────────────────────────
  for (const p of platforms) {
    if (!camera.visible(p.x, p.y, p.w, p.h)) continue;
    const sx = camera.toScreenX(p.x);
    const sy = p.y;

    if (p.y === FLOOR_Y_LOWER) {
      // Lower floor — heavy steel plates
      f(ctx, sx, sy, p.w, p.h, COL_FLOOR_LOWER);
      f(ctx, sx, sy,     p.w, 1, '#dd8800'); // amber safety edge
      f(ctx, sx, sy + 1, p.w, 1, '#994400');
      // Plate seams every 32px
      for (let ox = 0; ox < p.w; ox += 32) {
        f(ctx, sx + ox, sy + 2, 1, p.h - 2, '#20282e');
      }
      // Shallow surface grooves
      for (let oy = 7; oy < p.h; oy += 8) {
        f(ctx, sx, sy + oy, p.w, 1, '#242c34');
      }
    } else {
      // Upper catwalk — grated steel
      f(ctx, sx, sy, p.w, p.h, COL_FLOOR_UPPER);
      f(ctx, sx, sy, p.w, 1, '#3a5260'); // top highlight
      // Grating slits
      for (let oy = 2; oy < p.h - 1; oy += 3) {
        f(ctx, sx, sy + oy, p.w, 1, '#141e2a');
      }
      f(ctx, sx, sy + p.h - 1, p.w, 1, '#121c28'); // underside shadow
    }
  }

  // ── Doors ─────────────────────────────────────────────────────────────────
  for (const d of doors) {
    if (!camera.visible(d.x, d.y, DOOR_W, DOOR_H)) continue;
    const sx = Math.round(camera.toScreenX(d.x));
    const sy = d.y;

    // Frame
    const fc = '#283c54';
    f(ctx, sx - 2, sy - 2, 2,          DOOR_H + 4, fc);
    f(ctx, sx + DOOR_W, sy - 2, 2,     DOOR_H + 4, fc);
    f(ctx, sx - 2, sy - 2, DOOR_W + 4, 2,          fc);
    f(ctx, sx - 2, sy + DOOR_H, DOOR_W + 4, 2,     fc);
    // Rivet corners
    const rc = '#4a6078';
    f(ctx, sx - 2,          sy - 2,          3, 3, rc);
    f(ctx, sx + DOOR_W - 1, sy - 2,          3, 3, rc);
    f(ctx, sx - 2,          sy + DOOR_H - 1, 3, 3, rc);
    f(ctx, sx + DOOR_W - 1, sy + DOOR_H - 1, 3, 3, rc);

    if (d.open) {
      f(ctx, sx, sy, DOOR_W, DOOR_H, '#040608');
      f(ctx, sx,             sy, 2, DOOR_H, '#161e28');
      f(ctx, sx + DOOR_W - 2, sy, 2, DOOR_H, '#161e28');

    } else if (d.used) {
      f(ctx, sx, sy, DOOR_W, DOOR_H, '#14202c');
      f(ctx, sx, sy, DOOR_W, 1, '#1e2c3c');
      // Horizontal panel ribs
      for (let dy = 6; dy < DOOR_H - 4; dy += 8) {
        f(ctx, sx + 1, sy + dy, DOOR_W - 2, 1, '#101820');
      }
      f(ctx, sx + DOOR_W / 2 - 2, sy + 5, 4, 3, '#280a0a'); // dead indicator

    } else {
      // Closed — type-colored blast door with panel ribs
      f(ctx, sx, sy, DOOR_W, DOOR_H, DOOR_FACE[d.type]);

      // Horizontal panel ribs (blast-door look)
      for (let dy = 6; dy < DOOR_H - 4; dy += 8) {
        f(ctx, sx + 1, sy + dy, DOOR_W - 2, 1, 'rgba(0,0,0,0.35)');
      }

      // Bevel edges
      f(ctx, sx,             sy, 1, DOOR_H, 'rgba(255,255,255,0.12)');
      f(ctx, sx,             sy, DOOR_W, 1, 'rgba(255,255,255,0.12)');
      f(ctx, sx + DOOR_W - 1, sy, 1, DOOR_H, 'rgba(0,0,0,0.4)');
      f(ctx, sx,             sy + DOOR_H - 1, DOOR_W, 1, 'rgba(0,0,0,0.4)');

      // Status indicator light
      const ind = d.type === 'bullet' ? '#2090ff'
                : d.type === 'arms'   ? '#ff8020'
                :                       '#30cc40';
      f(ctx, sx + DOOR_W / 2 - 2, sy + 5, 4, 3, ind);
      f(ctx, sx + DOOR_W / 2 - 2, sy + 5, 2, 1, 'rgba(255,255,255,0.5)');

      // Label
      const label = d.type === 'bullet' ? 'B' : d.type === 'arms' ? 'A' : '';
      if (label) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '5px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, sx + DOOR_W / 2, sy + DOOR_H - 5);
      }
    }
  }

  ctx.textAlign = 'left';
}

// ── Foreground pass — catwalk railing drawn on top of entities ─────────────────
// RAIL_H: height of railing above catwalk surface
const RAIL_H = 14;
const RAIL_TOP  = '#4a6070';
const RAIL_MID  = '#364a58';
const RAIL_STRUT = '#2e4050';
const RAIL_DARK  = '#1c2e3c';

export function drawLevelFg(ctx, platforms) {
  for (const p of platforms) {
    if (p.y === FLOOR_Y_LOWER) continue; // only upper catwalks
    if (!camera.visible(p.x, p.y - RAIL_H, p.w, RAIL_H)) continue;

    const sx = camera.toScreenX(p.x);
    const sy = p.y;

    // Top rail bar
    f(ctx, sx, sy - RAIL_H,     p.w, 2, RAIL_TOP);
    f(ctx, sx, sy - RAIL_H,     p.w, 1, '#6a8090'); // top highlight
    f(ctx, sx, sy - RAIL_H + 2, p.w, 1, RAIL_DARK); // shadow under bar

    // Mid rail bar
    f(ctx, sx, sy - 7, p.w, 1, RAIL_MID);
    f(ctx, sx, sy - 6, p.w, 1, RAIL_DARK);

    // Vertical struts (world-scrolling every 12px)
    const off12 = Math.round((camera.x - p.x) % 12);
    for (let ox = -off12; ox < p.w + 12; ox += 12) {
      const rx = sx + ox;
      if (rx < sx - 2 || rx > sx + p.w + 2) continue;
      f(ctx, Math.round(rx), sy - RAIL_H + 2, 2, RAIL_H - 2, RAIL_STRUT);
      // Strut base cap
      f(ctx, Math.round(rx) - 1, sy - 1, 4, 2, RAIL_MID);
    }

    // Bottom mounting bar (sits on catwalk top edge)
    f(ctx, sx, sy - 2, p.w, 2, RAIL_MID);
    f(ctx, sx, sy - 2, p.w, 1, '#3a5060');
  }
}
