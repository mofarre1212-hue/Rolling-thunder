import { PLAYER_W } from '../constants.js';

// Palette
const HAT    = '#1c1008';
const HAT_D  = '#0a0604';
const SKIN   = '#c8a06a';
const SKIN_D = '#a07840';
const EYE    = '#160c04';
const COAT   = '#4a3a18';
const COAT_D = '#2e2410';
const COAT_L = '#6a5428';
const PANTS  = '#18183a';
const BOOT   = '#0c0c14';
const GUN    = '#747474';
const GUN_D  = '#484444';

function r(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x, y, w, h);
}

// Sets up a canvas transform so all draw calls work as if facing right,
// then mirrors for left-facing. Caller must restore ctx after drawing.
function beginSprite(ctx, bx, by, facing) {
  ctx.save();
  ctx.translate(Math.round(bx), Math.round(by));
  if (facing === -1) {
    ctx.translate(PLAYER_W, 0);
    ctx.scale(-1, 1);
  }
}

// Standing pose — 12 × 24
// frame: 0 or 1 for walk cycle
export function drawPlayerStand(ctx, bx, by, facing, frame) {
  beginSprite(ctx, bx, by, facing);

  // Hat crown
  r(ctx,  2,  0,  8,  3, HAT);
  r(ctx,  3,  2,  6,  1, HAT_D); // hat band detail

  // Brim
  r(ctx,  0,  3, 12,  1, HAT);
  r(ctx,  1,  4, 10,  1, HAT_D); // brim underside shadow

  // Face
  r(ctx,  3,  5,  6,  4, SKIN);
  r(ctx,  3,  5,  1,  2, HAT_D); // temple shadow under brim
  r(ctx,  5,  6,  1,  1, EYE);
  r(ctx,  7,  6,  1,  1, EYE);
  r(ctx,  4,  8,  4,  1, SKIN_D); // chin

  // Neck
  r(ctx,  5,  9,  2,  2, SKIN);

  // Coat torso
  r(ctx,  2, 11,  8,  8, COAT);
  r(ctx,  2, 11,  2,  5, COAT_D); // left lapel shadow
  r(ctx,  4, 11,  4,  2, COAT_L); // collar / chest highlight
  r(ctx,  9, 14,  1,  5, COAT_D); // right-side shadow

  // Belt
  r(ctx,  2, 19,  8,  1, HAT_D);

  // Legs — walk cycle: alternate which leg is stepped forward
  const lyA = frame === 0 ? 19 : 20;
  const lyB = frame === 0 ? 20 : 19;
  const lhA = frame === 0 ?  4 :  3;
  const lhB = frame === 0 ?  3 :  4;
  r(ctx,  2, lyA,  3, lhA, PANTS); // left leg
  r(ctx,  7, lyB,  3, lhB, PANTS); // right leg

  // Boots
  r(ctx,  1, 23,  4,  1, BOOT);
  r(ctx,  6, 23,  4,  1, BOOT);

  // Gun arm (right side = front when facing right)
  r(ctx, 10, 13,  2,  3, COAT);  // sleeve
  r(ctx, 12, 14,  3,  1, GUN);   // barrel
  r(ctx, 12, 15,  2,  1, GUN_D); // barrel underside

  ctx.restore();
}

// Crouching pose — 12 × 14
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Hat (compressed)
  r(ctx,  2,  0,  8,  2, HAT);
  r(ctx,  3,  1,  6,  1, HAT_D);
  r(ctx,  0,  2, 12,  1, HAT);
  r(ctx,  1,  3, 10,  1, HAT_D);

  // Face (head tilted slightly forward)
  r(ctx,  2,  4,  8,  3, SKIN);
  r(ctx,  2,  4,  1,  1, HAT_D); // temple shadow
  r(ctx,  4,  5,  1,  1, EYE);
  r(ctx,  6,  5,  1,  1, EYE);

  // Coat (hunched — wider, shorter)
  r(ctx,  1,  7, 10,  5, COAT);
  r(ctx,  1,  7,  2,  4, COAT_D); // left lapel
  r(ctx,  3,  7,  4,  1, COAT_L); // collar hint
  r(ctx,  9,  7,  2,  5, COAT_D); // right shadow

  // Bent legs
  r(ctx,  1, 12,  4,  2, PANTS);
  r(ctx,  7, 12,  4,  2, PANTS);

  // Boots (wider, flat on ground)
  r(ctx,  0, 13,  5,  1, BOOT);
  r(ctx,  6, 13,  5,  1, BOOT);

  // Gun arm (lowered for crouch shot)
  r(ctx,  9,  8,  2,  3, COAT);
  r(ctx, 11,  9,  3,  1, GUN);
  r(ctx, 11, 10,  2,  1, GUN_D);

  ctx.restore();
}
