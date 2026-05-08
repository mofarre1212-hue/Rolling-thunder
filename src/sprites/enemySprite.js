import { ENEMY_W } from '../constants.js';

// ── Grunt palette — olive battle armor, full amber visor ─────────────────────
const G_HELM    = '#1e2e10';
const G_HELM_D  = '#101808';
const G_HELM_L  = '#304818';
const G_VISOR   = '#c87800';
const G_VISOR_L = '#ffaa20';
const G_VISOR_D = '#885000';
const G_ARMOR   = '#2e3e1a';
const G_ARMOR_D = '#1a2410';
const G_ARMOR_L = '#3e5224';
const G_ARMOR_M = '#263018';
const G_BELT    = '#141208';
const G_LEGS    = '#1a1e10';
const G_BOOT    = '#0e0e0a';

// ── Rifleman palette — dark maroon uniform, beret, exposed face ───────────────
const R_BERET   = '#2a1010';
const R_BERET_L = '#401818';
const R_SKIN    = '#d4a060';
const R_SKIN_D  = '#a07840';
const R_EYE     = '#180800';
const R_UNIF    = '#5a1c18';
const R_UNIF_D  = '#380e0c';
const R_UNIF_L  = '#7a2c28';
const R_UNIF_M  = '#4a1614';
const R_PANTS   = '#1e1c2e';
const R_PANTS_D = '#141222';
const R_BOOT    = '#141010';
const R_GUN     = '#707070';
const R_GUN_D   = '#404040';
const R_GUN_L   = '#a0a0a0';

function r(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x, y, w, h);
}

function beginSprite(ctx, bx, by, facing) {
  ctx.save();
  ctx.translate(Math.round(bx), Math.round(by));
  if (facing === -1) {
    ctx.translate(ENEMY_W, 0);
    ctx.scale(-1, 1);
  }
}

// ── Grunt standing — 16 × 32 ─────────────────────────────────────────────────
// charging=true extends the right arm forward for the melee-rush look
export function drawGruntStand(ctx, bx, by, facing, charging) {
  beginSprite(ctx, bx, by, facing);

  // Helmet (bulky, wide)
  r(ctx,  3, 0, 10, 1, G_HELM_L);
  r(ctx,  2, 1, 12, 3, G_HELM);
  r(ctx,  2, 1,  1, 3, G_HELM_D);
  r(ctx, 13, 1,  1, 3, G_HELM_D);

  // Amber visor (large, fully enclosed — no visible face)
  r(ctx,  3, 4,  2, 4, G_VISOR_D);
  r(ctx,  5, 4,  6, 4, G_VISOR);
  r(ctx, 11, 4,  2, 4, G_VISOR_D);
  r(ctx,  5, 4,  3, 2, G_VISOR_L);

  // Chin guard
  r(ctx,  4, 8,  8, 2, G_HELM);
  r(ctx,  4, 8,  1, 2, G_HELM_D);
  r(ctx, 11, 8,  1, 2, G_HELM_D);

  // Neck armor
  r(ctx, 6, 10, 4, 2, G_ARMOR_D);

  // Wide shoulder plates
  r(ctx,  0, 12, 16, 2, G_ARMOR_L);
  r(ctx,  0, 12,  1, 2, G_ARMOR_D);
  r(ctx, 15, 12,  1, 2, G_ARMOR_D);

  // Body armor — 3-tone shading
  r(ctx,  2, 14, 12,  9, G_ARMOR);
  r(ctx,  2, 14,  2,  9, G_ARMOR_D);
  r(ctx, 12, 14,  2,  9, G_ARMOR_D);
  r(ctx,  5, 14,  6,  4, G_ARMOR_L);
  r(ctx,  4, 18,  2,  5, G_ARMOR_M);
  r(ctx, 10, 18,  2,  5, G_ARMOR_M);

  // Waist armor
  r(ctx, 3, 23, 10, 2, G_BELT);

  // Leg armor
  r(ctx,  3, 25, 5, 5, G_LEGS);
  r(ctx,  3, 25, 1, 5, G_ARMOR_D);
  r(ctx,  9, 25, 5, 5, G_LEGS);
  r(ctx, 13, 25, 1, 5, G_ARMOR_D);

  // Boots
  r(ctx, 2, 30, 6, 2, G_BOOT);
  r(ctx, 9, 30, 6, 2, G_BOOT);

  // Right arm
  if (charging) {
    r(ctx, 14, 14, 6, 4, G_ARMOR);
    r(ctx, 14, 14, 1, 4, G_ARMOR_D);
    r(ctx, 19, 15, 2, 3, G_ARMOR_M);
  } else {
    r(ctx, 14, 16, 3, 7, G_ARMOR);
    r(ctx, 14, 16, 1, 7, G_ARMOR_D);
  }

  ctx.restore();
}

// ── Rifleman standing — 16 × 32 ──────────────────────────────────────────────
export function drawRiflemanStand(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Beret
  r(ctx,  3, 0, 10, 1, R_BERET_L);
  r(ctx,  2, 1, 12, 3, R_BERET);
  r(ctx,  2, 1,  1, 3, '#1a0808');

  // Face
  r(ctx, 4, 4, 8, 1, R_SKIN);
  r(ctx, 3, 5, 10, 4, R_SKIN);
  r(ctx, 5, 6, 2, 1, R_EYE);
  r(ctx, 9, 6, 2, 1, R_EYE);
  r(ctx, 4, 8, 3, 1, R_SKIN_D);
  r(ctx, 9, 8, 3, 1, R_SKIN_D);

  // Neck
  r(ctx, 7, 9, 2, 2, R_SKIN);

  // Collar flash
  r(ctx, 5, 11, 6, 1, R_UNIF_L);

  // Uniform body — 3-tone shading
  r(ctx,  2, 12, 12, 11, R_UNIF);
  r(ctx,  2, 12,  2, 11, R_UNIF_D);
  r(ctx, 12, 12,  2, 11, R_UNIF_D);
  r(ctx,  5, 12,  6,  4, R_UNIF_L);
  r(ctx,  4, 16,  2,  7, R_UNIF_M);
  r(ctx, 10, 16,  2,  7, R_UNIF_M);

  // Belt
  r(ctx, 3, 23, 10, 2, R_BOOT);

  // Pants
  r(ctx,  3, 25, 5, 5, R_PANTS);
  r(ctx,  3, 25, 1, 5, R_PANTS_D);
  r(ctx,  9, 25, 5, 5, R_PANTS);
  r(ctx, 13, 25, 1, 5, R_PANTS_D);

  // Boots
  r(ctx, 2, 30, 6, 2, R_BOOT);
  r(ctx, 9, 30, 6, 2, R_BOOT);

  // Gun arm + weapon
  r(ctx, 14, 15, 3, 5, R_UNIF);
  r(ctx, 14, 15, 1, 5, R_UNIF_D);
  r(ctx, 17, 15, 3, 1, R_GUN_L);
  r(ctx, 17, 16, 5, 2, R_GUN);
  r(ctx, 17, 17, 3, 1, R_GUN_D);

  ctx.restore();
}

// ── Rifleman crouching — 16 × 20 ─────────────────────────────────────────────
export function drawRiflemanCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Beret
  r(ctx, 2, 0, 10, 1, R_BERET_L);
  r(ctx, 1, 1, 12, 2, R_BERET);

  // Face (tilted forward)
  r(ctx, 3, 3, 8, 3, R_SKIN);
  r(ctx, 4, 4, 2, 1, R_EYE);
  r(ctx, 7, 4, 2, 1, R_EYE);
  r(ctx, 4, 5, 2, 1, R_SKIN_D);

  // Uniform (hunched — wider silhouette)
  r(ctx,  1,  6, 13, 7, R_UNIF);
  r(ctx,  1,  6,  2, 7, R_UNIF_D);
  r(ctx, 12,  6,  2, 7, R_UNIF_D);
  r(ctx,  4,  7,  6, 3, R_UNIF_L);
  r(ctx,  3, 10,  2, 3, R_UNIF_M);
  r(ctx, 11, 10,  2, 3, R_UNIF_M);

  // Belt
  r(ctx, 2, 13, 10, 1, R_BOOT);

  // Pants (bent knee)
  r(ctx,  2, 14, 5, 5, R_PANTS);
  r(ctx,  2, 14, 1, 5, R_PANTS_D);
  r(ctx,  9, 14, 5, 5, R_PANTS);
  r(ctx, 13, 14, 1, 5, R_PANTS_D);

  // Boots
  r(ctx, 1, 19, 6, 1, R_BOOT);
  r(ctx, 9, 19, 6, 1, R_BOOT);

  // Gun arm (lowered for crouch shot)
  r(ctx, 13,  8, 3, 4, R_UNIF);
  r(ctx, 13,  8, 1, 4, R_UNIF_D);
  r(ctx, 16,  8, 3, 1, R_GUN_L);
  r(ctx, 16,  9, 5, 2, R_GUN);
  r(ctx, 16, 10, 3, 1, R_GUN_D);

  ctx.restore();
}

// ── Fallen enemy heap — entity top is by, bottom is by + ENEMY_H ─────────────
export function drawEnemyDead(ctx, bx, by, type) {
  const x = Math.round(bx);
  const y = Math.round(by);
  function rf(ox, oy, w, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(x + ox, y + oy, w, h);
  }
  if (type === 'grunt') {
    rf( 3, 16,  8, 4, G_HELM);
    rf( 4, 18,  6, 2, G_VISOR);
    rf( 0, 20, 16, 8, G_ARMOR);
    rf( 0, 20,  2, 8, G_ARMOR_D);
    rf(14, 20,  2, 8, G_ARMOR_D);
    rf( 0, 28,  7, 4, G_BOOT);
    rf( 9, 28,  7, 4, G_BOOT);
  } else {
    rf( 3, 16,  8, 3, R_BERET);
    rf( 5, 17,  5, 2, R_SKIN);
    rf( 0, 19, 16, 8, R_UNIF);
    rf( 0, 19,  2, 8, R_UNIF_D);
    rf(14, 19,  2, 8, R_UNIF_D);
    rf( 1, 27, 14, 3, R_PANTS);
    rf( 0, 29,  6, 3, R_BOOT);
    rf(10, 29,  6, 3, R_BOOT);
  }
}
