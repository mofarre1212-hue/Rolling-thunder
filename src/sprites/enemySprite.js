import { ENEMY_W } from '../constants.js';

// ── Grunt palette — dark olive armor, amber visor ─────────────────────────────
const G_HELM    = '#2a3a18';
const G_VISOR   = '#c87000';
const G_VISOR_L = '#ffa020';
const G_ARMOR   = '#384828';
const G_ARMOR_D = '#1e2a10';
const G_ARMOR_L = '#4a6030';
const G_LEGS    = '#202418';
const G_BOOT    = '#141410';

// ── Rifleman palette — dark maroon uniform ────────────────────────────────────
const R_BERET   = '#3a1010';
const R_SKIN    = '#c8a06a';
const R_SKIN_D  = '#a08050';
const R_EYE     = '#160800';
const R_UNIF    = '#6a2018';
const R_UNIF_D  = '#4a1408';
const R_UNIF_L  = '#8a3028';
const R_PANTS   = '#2a2034';
const R_PANTS_D = '#1a1424';
const R_BOOT    = '#1a1218';
const R_GUN     = '#6a6a6a';
const R_GUN_D   = '#444444';

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

// ── Grunt standing — 12 × 24 ──────────────────────────────────────────────────
// charging=true extends the right arm forward for the melee-rush look
export function drawGruntStand(ctx, bx, by, facing, charging) {
  beginSprite(ctx, bx, by, facing);

  // Helmet (bulky, rounded)
  r(ctx, 2, 0, 8, 1, G_HELM);
  r(ctx, 1, 1, 10, 3, G_HELM);

  // Amber visor — no face, fully helmeted
  r(ctx, 2, 3, 8, 3, G_VISOR);
  r(ctx, 3, 3, 2, 2, G_VISOR_L); // glint

  // Chin guard
  r(ctx, 3, 6, 6, 2, G_HELM);

  // Body armor (slightly wider than player — stocky)
  r(ctx, 1, 8, 10, 9, G_ARMOR);
  r(ctx, 1, 8,  1, 9, G_ARMOR_D);
  r(ctx, 10, 8, 1, 9, G_ARMOR_D);
  r(ctx, 2, 8,  4, 3, G_ARMOR_L); // shoulder highlight

  // Belt
  r(ctx, 2, 17, 8, 1, G_ARMOR_D);

  // Legs
  r(ctx, 2, 18, 4, 5, G_LEGS);
  r(ctx, 7, 18, 4, 5, G_LEGS);

  // Boots
  r(ctx, 1, 23, 4, 1, G_BOOT);
  r(ctx, 6, 23, 4, 1, G_BOOT);

  // Right arm: extended forward when charging, tucked otherwise
  if (charging) {
    r(ctx, 10, 10, 4, 4, G_ARMOR); // arm thrust forward
  } else {
    r(ctx, 10, 11, 2, 5, G_ARMOR); // arm at side
  }

  ctx.restore();
}

// ── Rifleman standing — 12 × 24 ───────────────────────────────────────────────
export function drawRiflemanStand(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Beret
  r(ctx, 2, 0, 8, 2, R_BERET);
  r(ctx, 1, 1, 10, 2, R_BERET);

  // Face
  r(ctx, 3, 3, 6, 5, R_SKIN);
  r(ctx, 4, 5, 1, 1, R_EYE);
  r(ctx, 7, 5, 1, 1, R_EYE);
  r(ctx, 4, 7, 4, 1, R_SKIN_D);

  // Neck
  r(ctx, 5, 8, 2, 1, R_SKIN);

  // Uniform
  r(ctx, 1, 9, 9, 8, R_UNIF);
  r(ctx, 1, 9, 1, 8, R_UNIF_D);
  r(ctx, 9, 9, 1, 8, R_UNIF_D);
  r(ctx, 3, 9, 4, 2, R_UNIF_L);

  // Belt
  r(ctx, 2, 17, 8, 1, R_BOOT);

  // Pants
  r(ctx, 2, 18, 4, 5, R_PANTS);
  r(ctx, 2, 18, 1, 5, R_PANTS_D);
  r(ctx, 7, 18, 4, 5, R_PANTS);
  r(ctx, 10, 18, 1, 5, R_PANTS_D);

  // Boots
  r(ctx, 1, 23, 4, 1, R_BOOT);
  r(ctx, 6, 23, 4, 1, R_BOOT);

  // Gun arm
  r(ctx, 10, 12, 2, 3, R_UNIF);
  r(ctx, 12, 13, 3, 1, R_GUN);
  r(ctx, 12, 14, 2, 1, R_GUN_D);

  ctx.restore();
}

// ── Rifleman crouching — 12 × 14 ──────────────────────────────────────────────
export function drawRiflemanCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Beret
  r(ctx, 2, 0, 7, 2, R_BERET);
  r(ctx, 1, 1, 9, 1, R_BERET);

  // Face (tilted forward)
  r(ctx, 2, 2, 7, 3, R_SKIN);
  r(ctx, 4, 3, 1, 1, R_EYE);
  r(ctx, 6, 3, 1, 1, R_EYE);
  r(ctx, 3, 4, 1, 1, R_SKIN_D);

  // Uniform (hunched)
  r(ctx, 1, 5, 10, 6, R_UNIF);
  r(ctx, 1, 5,  1, 6, R_UNIF_D);
  r(ctx, 3, 5,  4, 2, R_UNIF_L);
  r(ctx, 9, 5,  2, 6, R_UNIF_D);

  // Pants (bent)
  r(ctx,  1, 11, 4, 2, R_PANTS);
  r(ctx,  1, 11, 1, 2, R_PANTS_D);
  r(ctx,  7, 11, 4, 2, R_PANTS);
  r(ctx, 10, 11, 1, 2, R_PANTS_D);

  // Boots
  r(ctx, 0, 13, 5, 1, R_BOOT);
  r(ctx, 6, 13, 5, 1, R_BOOT);

  // Gun arm (lowered for crouch shot)
  r(ctx,  9, 6, 2, 4, R_UNIF);
  r(ctx, 11, 7, 3, 1, R_GUN);
  r(ctx, 11, 8, 2, 1, R_GUN_D);

  ctx.restore();
}

// ── Fallen enemy heap — drawn at entity top (currentFloorY - ENEMY_H) ─────────
export function drawEnemyDead(ctx, bx, by, type) {
  if (type === 'grunt') {
    ctx.fillStyle = G_HELM;
    ctx.fillRect(bx + 2, by + 13, 6, 4); // helmet
    ctx.fillStyle = G_ARMOR;
    ctx.fillRect(bx,     by + 17, 12, 4); // torso
    ctx.fillRect(bx + 1, by + 21, 10, 2); // legs
    ctx.fillStyle = G_BOOT;
    ctx.fillRect(bx,     by + 22, 4,  2); // left boot
    ctx.fillRect(bx + 7, by + 22, 4,  2); // right boot
  } else {
    ctx.fillStyle = R_BERET;
    ctx.fillRect(bx + 2, by + 13, 6, 3); // beret
    ctx.fillStyle = R_SKIN;
    ctx.fillRect(bx + 4, by + 14, 3, 2); // face visible
    ctx.fillStyle = R_UNIF;
    ctx.fillRect(bx,     by + 16, 12, 5); // torso
    ctx.fillRect(bx + 1, by + 21, 10, 2); // legs
    ctx.fillStyle = R_BOOT;
    ctx.fillRect(bx,     by + 22, 4,  2);
    ctx.fillRect(bx + 7, by + 22, 4,  2);
  }
}
