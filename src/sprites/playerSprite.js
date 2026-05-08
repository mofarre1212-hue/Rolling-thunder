import { PLAYER_W } from '../constants.js';

// ── Palette ───────────────────────────────────────────────────────────────────
const HAIR     = '#0a0606';
const SKIN     = '#f0c07a';
const SKIN_D   = '#c09040';
const SKIN_L   = '#f8d0a0';
const EYE      = '#060402';
const SHIRT    = '#f4f0e0';
const JACKET   = '#c01818';
const JACKET_D = '#700808';
const JACKET_L = '#e83030';
const JACKET_M = '#a01212';
const PANTS    = '#484a60';
const PANTS_D  = '#282a3c';
const BELT     = '#181008';
const BKL      = '#c89010';
const BOOTS    = '#181010';
const BOOTS_D  = '#0a0808';
const GUN      = '#8a9090';
const GUN_D    = '#484c4c';
const GUN_L    = '#b8c0c0';

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

// ── Standing pose — 20 × 40 ───────────────────────────────────────────────────
export function drawPlayerStand(ctx, bx, by, facing, frame) {
  beginSprite(ctx, bx, by, facing);

  // Hair
  r(ctx, 5,  0, 10, 1, HAIR);
  r(ctx, 4,  1, 12, 2, HAIR);
  r(ctx, 4,  3,  1, 3, HAIR);   // left sideburn
  r(ctx, 15, 3,  1, 3, HAIR);   // right sideburn

  // Face
  r(ctx, 5,  3, 10, 1, SKIN);        // forehead
  r(ctx, 4,  4, 12, 5, SKIN);        // main face
  r(ctx, 4,  4,  1, 3, SKIN_D);      // left temple shadow
  r(ctx, 15, 4,  1, 3, SKIN_D);      // right temple shadow
  r(ctx, 6,  5,  3, 2, EYE);         // left eye socket
  r(ctx, 11, 5,  3, 2, EYE);         // right eye socket
  r(ctx, 7,  5,  1, 1, SKIN_L);      // left eye glint
  r(ctx, 12, 5,  1, 1, SKIN_L);      // right eye glint
  r(ctx, 5,  8,  4, 1, SKIN_D);      // left jaw shadow
  r(ctx, 11, 8,  4, 1, SKIN_D);      // right jaw shadow
  r(ctx, 7,  9,  1, 1, SKIN_D);      // chin notch

  // Neck
  r(ctx, 9, 10, 2, 2, SKIN);

  // White shirt collar (V-neck opening)
  r(ctx, 7, 12, 6, 3, SHIRT);
  r(ctx, 6, 14, 8, 1, SHIRT);

  // ── Coat — shoulder caps (wider than body) ────────────────────────────────
  r(ctx,  1, 14, 18,  3, JACKET_L);  // shoulder highlight strip
  r(ctx,  1, 14,  2,  3, JACKET_D);  // left shoulder shadow
  r(ctx, 17, 14,  2,  3, JACKET_D);  // right shoulder shadow

  // Coat upper body
  r(ctx,  2, 17, 16, 10, JACKET);
  r(ctx,  2, 17,  2, 10, JACKET_D);
  r(ctx, 16, 17,  2, 10, JACKET_D);
  r(ctx,  5, 17, 10,  4, JACKET_L);  // chest highlight
  r(ctx,  4, 21,  3,  6, JACKET_M);  // left mid panel
  r(ctx, 13, 21,  3,  6, JACKET_M);  // right mid panel

  // Lapels: shirt visible in V, red lapel faces
  r(ctx,  8, 15,  4,  9, SHIRT);     // shirt showing through V-neck
  r(ctx,  7, 15,  2,  9, JACKET_L);  // left lapel face
  r(ctx, 11, 15,  2,  9, JACKET_L);  // right lapel face
  r(ctx,  8, 15,  1,  9, JACKET_M);  // left lapel inner edge
  r(ctx, 11, 15,  1,  9, JACKET_M);  // right lapel inner edge

  // Belt + gold buckle
  r(ctx,  3, 27, 14, 2, BELT);
  r(ctx,  8, 27,  5, 2, BKL);

  // ── Pants — walk-cycle legs (drawn before coat flaps so flaps overlay) ─────
  const [lyL, lhL, lyR, lhR] = frame === 0
    ? [30, 9, 33, 6]   // left leg forward
    : [33, 6, 30, 9];  // right leg forward
  r(ctx,  7, lyL, 3, lhL, PANTS);
  r(ctx,  9, lyL, 1, lhL, PANTS_D);
  r(ctx, 11, lyR, 3, lhR, PANTS);
  r(ctx, 13, lyR, 1, lhR, PANTS_D);

  // ── Coat flaps (over pants edges — long-coat silhouette) ──────────────────
  r(ctx,  2, 29,  5, 10, JACKET);
  r(ctx,  2, 29,  2, 10, JACKET_D);
  r(ctx,  4, 29,  1, 10, JACKET_L);  // left flap highlight
  r(ctx, 13, 29,  5, 10, JACKET);
  r(ctx, 16, 29,  2, 10, JACKET_D);
  r(ctx, 13, 29,  1, 10, JACKET_L);  // right flap highlight

  // ── Boots ─────────────────────────────────────────────────────────────────
  r(ctx,  5, 37,  6, 3, BOOTS);
  r(ctx,  5, 37,  1, 3, BOOTS_D);    // inner shadow
  r(ctx,  5, 39,  7, 1, BOOTS_D);    // left sole
  r(ctx, 11, 37,  6, 3, BOOTS);
  r(ctx, 16, 37,  1, 3, BOOTS_D);
  r(ctx, 10, 39,  7, 1, BOOTS_D);    // right sole

  // ── Gun arm (extends right beyond sprite width) ───────────────────────────
  r(ctx, 18, 19,  3, 7, JACKET);
  r(ctx, 18, 19,  1, 7, JACKET_D);
  r(ctx, 21, 19,  3, 1, GUN_L);      // receiver top glint
  r(ctx, 21, 20,  7, 2, GUN);        // barrel
  r(ctx, 21, 21,  6, 1, GUN_D);      // barrel underside
  r(ctx, 23, 22,  3, 1, GUN_D);      // muzzle shadow

  ctx.restore();
}

// ── Crouching pose — 20 × 26 ──────────────────────────────────────────────────
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Hair (head bowed forward)
  r(ctx, 4,  0, 11, 1, HAIR);
  r(ctx, 3,  1, 12, 2, HAIR);
  r(ctx, 3,  3,  1, 2, HAIR);   // sideburn

  // Face (tilted down)
  r(ctx, 4,  3, 10, 1, SKIN);
  r(ctx, 3,  4, 11, 3, SKIN);
  r(ctx, 3,  4,  1, 2, SKIN_D);
  r(ctx, 5,  5,  3, 1, EYE);
  r(ctx, 9,  5,  3, 1, EYE);
  r(ctx, 6,  5,  1, 1, SKIN_L);
  r(ctx, 10, 5,  1, 1, SKIN_L);
  r(ctx, 4,  7,  3, 1, SKIN_D);  // jaw shadow
  r(ctx, 8,  7,  3, 1, SKIN_D);

  // Shirt collar
  r(ctx, 6, 8, 5, 1, SHIRT);

  // Hunch coat — wider/lower silhouette
  r(ctx,  1,  8, 17,  3, JACKET_L);  // shoulder hump
  r(ctx,  1,  8,  2,  3, JACKET_D);
  r(ctx, 16,  8,  2,  3, JACKET_D);

  // Coat body (compressed)
  r(ctx,  2, 11, 14,  7, JACKET);
  r(ctx,  2, 11,  2,  7, JACKET_D);
  r(ctx, 14, 11,  2,  7, JACKET_D);
  r(ctx,  5, 11,  8,  3, JACKET_L);  // chest highlight
  r(ctx,  4, 14,  3,  4, JACKET_M);
  r(ctx, 11, 14,  3,  4, JACKET_M);

  // Lapels
  r(ctx,  7,  9,  4,  8, SHIRT);
  r(ctx,  6,  9,  2,  8, JACKET_L);
  r(ctx, 10,  9,  2,  8, JACKET_L);
  r(ctx,  7,  9,  1,  8, JACKET_M);
  r(ctx, 10,  9,  1,  8, JACKET_M);

  // Belt
  r(ctx, 2, 18, 14, 1, BELT);
  r(ctx, 7, 18,  4, 1, BKL);

  // Pants (bent knee — wide, flat)
  r(ctx,  3, 19, 5, 5, PANTS);
  r(ctx,  3, 19, 1, 5, PANTS_D);
  r(ctx, 11, 19, 5, 5, PANTS);
  r(ctx, 15, 19, 1, 5, PANTS_D);

  // Boots (flat on ground, wider stance)
  r(ctx,  2, 23, 7, 3, BOOTS);
  r(ctx,  2, 23, 1, 3, BOOTS_D);
  r(ctx,  2, 25, 7, 1, BOOTS_D);
  r(ctx, 10, 23, 7, 3, BOOTS);
  r(ctx, 16, 23, 1, 3, BOOTS_D);
  r(ctx, 10, 25, 7, 1, BOOTS_D);

  // Gun arm (lowered, aimed flat)
  r(ctx, 16, 12,  3, 5, JACKET);
  r(ctx, 16, 12,  1, 5, JACKET_D);
  r(ctx, 19, 12,  3, 1, GUN_L);
  r(ctx, 19, 13,  6, 2, GUN);
  r(ctx, 19, 14,  5, 1, GUN_D);

  ctx.restore();
}
