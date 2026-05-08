import { PLAYER_W } from '../constants.js';

// ── Palette ───────────────────────────────────────────────────────────────────
const HAIR     = '#150a04';
const SKIN     = '#e8b878';
const SKIN_D   = '#b88040';
const EYE      = '#0c0800';
const SHIRT    = '#f0f0e0';
const JACKET   = '#cc1a1a';
const JACKET_D = '#880e0e';
const JACKET_L = '#ee4444';
const JACKET_M = '#aa1616';
const PANTS    = '#606272';
const PANTS_D  = '#3e4054';
const BELT     = '#1c1008';
const BKL      = '#c89018';
const SHOES    = '#cc1a1a';
const SHOES_D  = '#881010';
const GUN      = '#909090';
const GUN_D    = '#505050';
const GUN_L    = '#c0c0c0';

function r(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x, y, w, h);
}

function beginSprite(ctx, bx, by, facing) {
  ctx.save();
  ctx.translate(Math.round(bx), Math.round(by));
  if (facing === -1) {
    ctx.translate(PLAYER_W, 0);
    ctx.scale(-1, 1);
  }
}

// Standing pose — 16 × 32
export function drawPlayerStand(ctx, bx, by, facing, frame) {
  beginSprite(ctx, bx, by, facing);

  // ── Hair ──────────────────────────────────────────────────────────────────
  r(ctx, 4, 0, 8, 1, HAIR);
  r(ctx, 3, 1, 10, 2, HAIR);

  // ── Face ──────────────────────────────────────────────────────────────────
  r(ctx, 4, 3, 8, 1, SKIN);
  r(ctx, 3, 4, 10, 4, SKIN);
  r(ctx, 5, 5, 2, 1, EYE);
  r(ctx, 9, 5, 2, 1, EYE);
  r(ctx, 4, 7, 3, 1, SKIN_D);
  r(ctx, 9, 7, 3, 1, SKIN_D);

  // ── Neck ──────────────────────────────────────────────────────────────────
  r(ctx, 7, 8, 2, 2, SKIN);

  // ── White collar ──────────────────────────────────────────────────────────
  r(ctx, 5, 10, 6, 1, SHIRT);
  r(ctx, 4, 11, 8, 1, SHIRT);

  // ── Red jacket — 3-tone shading ───────────────────────────────────────────
  r(ctx,  2, 12, 12, 11, JACKET);
  r(ctx,  2, 12,  2, 11, JACKET_D);
  r(ctx, 12, 12,  2, 11, JACKET_D);
  r(ctx,  5, 12,  6,  4, JACKET_L);
  r(ctx,  4, 16,  2,  7, JACKET_M);
  r(ctx, 10, 16,  2,  7, JACKET_M);

  // ── Belt + buckle ─────────────────────────────────────────────────────────
  r(ctx, 3, 23, 10, 1, BELT);
  r(ctx, 3, 24,  2,  1, BELT);
  r(ctx, 11,24,  2,  1, BELT);
  r(ctx, 6, 23,  4,  2, BKL);

  // ── Pants — 2-frame walk cycle ────────────────────────────────────────────
  const lyL = frame === 0 ? 25 : 26;
  const lyR = frame === 0 ? 26 : 25;
  r(ctx,  3, lyL, 5, 5, PANTS);
  r(ctx,  3, lyL, 1, 5, PANTS_D);
  r(ctx,  9, lyR, 5, 5, PANTS);
  r(ctx, 13, lyR, 1, 5, PANTS_D);

  // ── Shoes ─────────────────────────────────────────────────────────────────
  r(ctx,  2, 30, 7, 2, SHOES);
  r(ctx,  2, 31, 1, 1, SHOES_D);
  r(ctx,  9, 30, 6, 2, SHOES);
  r(ctx, 14, 31, 1, 1, SHOES_D);

  // ── Gun arm + weapon (extends right beyond sprite width) ──────────────────
  r(ctx, 14, 15,  3, 4, JACKET);
  r(ctx, 14, 15,  1, 4, JACKET_D);
  r(ctx, 17, 15,  3, 1, GUN_L);
  r(ctx, 17, 16,  5, 2, GUN);
  r(ctx, 17, 17,  3, 1, GUN_D);

  ctx.restore();
}

// Crouching pose — 16 × 20
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // ── Hair (head bowed forward) ─────────────────────────────────────────────
  r(ctx, 3, 0, 9, 1, HAIR);
  r(ctx, 2, 1, 11, 2, HAIR);

  // ── Face (angled down) ────────────────────────────────────────────────────
  r(ctx, 3, 3, 9, 3, SKIN);
  r(ctx, 4, 4, 2, 1, EYE);
  r(ctx, 8, 4, 2, 1, EYE);
  r(ctx, 4, 5, 2, 1, SKIN_D);

  // ── Collar ────────────────────────────────────────────────────────────────
  r(ctx, 5, 6, 4, 1, SHIRT);

  // ── Jacket (hunched — wider, compressed) ──────────────────────────────────
  r(ctx,  1,  6, 13, 8, JACKET);
  r(ctx,  1,  6,  2, 8, JACKET_D);
  r(ctx, 12,  6,  2, 8, JACKET_D);
  r(ctx,  4,  7,  6, 3, JACKET_L);
  r(ctx,  3, 10,  2, 4, JACKET_M);
  r(ctx, 11, 10,  2, 4, JACKET_M);

  // ── Belt + buckle ─────────────────────────────────────────────────────────
  r(ctx, 2, 14, 10, 1, BELT);
  r(ctx, 6, 14,  3, 1, BKL);

  // ── Pants (bent knee) ─────────────────────────────────────────────────────
  r(ctx,  2, 15, 5, 4, PANTS);
  r(ctx,  2, 15, 1, 4, PANTS_D);
  r(ctx,  9, 15, 5, 4, PANTS);
  r(ctx, 13, 15, 1, 4, PANTS_D);

  // ── Shoes (flat, wide) ────────────────────────────────────────────────────
  r(ctx, 1, 19, 6, 1, SHOES);
  r(ctx, 9, 19, 6, 1, SHOES);

  // ── Gun arm (lowered into crouch-shoot stance) ────────────────────────────
  r(ctx, 13,  8, 3, 4, JACKET);
  r(ctx, 13,  8, 1, 4, JACKET_D);
  r(ctx, 16,  8, 3, 1, GUN_L);
  r(ctx, 16,  9, 5, 2, GUN);
  r(ctx, 16, 10, 3, 1, GUN_D);

  ctx.restore();
}
