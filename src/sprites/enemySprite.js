import { ENEMY_W } from '../constants.js';

// ── Grunt palette — olive armored brawler, amber visor ───────────────────────
// Helmet/armor — 5-step olive with yellow-green highlight shift
const G_HELM_DD  = '#0a1006';
const G_HELM_D   = '#141e0c';
const G_HELM     = '#1e3014';
const G_HELM_L   = '#2e4818';
const G_HELM_HL  = '#486030';   // yellow-green hot spot

// Visor — 4-step with hot amber highlight
const G_VISOR_DD = '#3a2000';
const G_VISOR_D  = '#804800';
const G_VISOR    = '#c87800';
const G_VISOR_L  = '#ffaa20';
const G_VISOR_HL = '#ffe060';   // near-white hot spot

// Armor — 5-step with yellow-green highlight
const G_ARMOR_DD = '#0e1408';
const G_ARMOR_D  = '#182010';
const G_ARMOR_M  = '#202810';
const G_ARMOR    = '#2a3418';
const G_ARMOR_L  = '#3c4c22';
const G_ARMOR_HL = '#526830';   // yellow-green shift

// Straps/pouches — 3-step
const G_STRAP    = '#141208';
const G_STRAP_L  = '#242010';
const G_POUCH    = '#1e2410';
const G_POUCH_L  = '#2c3418';

// Knee pad — 3-step
const G_KNEE_D   = '#141808';
const G_KNEE     = '#202c14';
const G_KNEE_L   = '#304020';

// Boot — 3-step (separate from armor to read as different material)
const G_BOOT_DD  = '#060806';
const G_BOOT     = '#0c140a';
const G_BOOT_L   = '#182010';

// ── Rifleman palette — dark tactical operative ────────────────────────────────
// Balaclava — 4-step (large surface needs more depth)
const R_BALA_DD  = '#0a0808';
const R_BALA_D   = '#100e0c';
const R_BALA     = '#1c1816';
const R_BALA_L   = '#2a2420';

// Skin — 4-step warm
const R_SKIN_D   = '#a07038';
const R_SKIN     = '#c89050';
const R_SKIN_L   = '#e0a868';
const R_EYE      = '#060402';
const R_EYE_L    = '#b08858';

// Vest — 4-step olive tactical
const R_VEST_DD  = '#0e1408';
const R_VEST_D   = '#141c10';
const R_VEST     = '#202c18';
const R_VEST_L   = '#2e4020';
const R_VEST_HL  = '#405430';   // yellow-green hint

// Jacket uniform — 4-step warm khaki-brown
const R_JACK_DD  = '#181008';
const R_JACK_D   = '#281808';
const R_JACKET   = '#383028';
const R_JACKET_L = '#4e4438';

// Pants — 4-step with cool blue shift
const R_PANTS_DD = '#0e0e1c';
const R_PANTS_D  = '#141422';
const R_PANTS    = '#1e1e30';
const R_PANTS_L  = '#2e2e48';

// Boots — 3-step (near-black leather)
const R_BOOT_DD  = '#080608';
const R_BOOT     = '#141010';
const R_BOOT_L   = '#201a18';

// Gun — 4-step cool metal
const R_GUN_DD   = '#1e2028';
const R_GUN_D    = '#383840';
const R_GUN      = '#686870';
const R_GUN_L    = '#9898a8';
const R_GUN_HL   = '#b8bcc8';   // blue-white glint

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

// ── Grunt standing — 20 × 40 ─────────────────────────────────────────────────
export function drawGruntStand(ctx, bx, by, facing, charging) {
  beginSprite(ctx, bx, by, facing);

  // Helmet — dome with 5-step ramp
  r(ctx,  3,  0, 14,  1, G_HELM_HL);  // dome top glint
  r(ctx,  4,  0,  6,  1, G_HELM_L);   // soften the glint
  r(ctx,  2,  1, 16,  4, G_HELM);
  r(ctx,  2,  1,  1,  4, G_HELM_DD);  // left deep shadow
  r(ctx, 17,  1,  1,  4, G_HELM_DD);  // right deep shadow
  r(ctx,  3,  1,  2,  4, G_HELM_D);   // left shadow
  r(ctx, 15,  1,  2,  4, G_HELM_D);
  r(ctx,  4,  2,  4,  2, G_HELM_L);   // dome shine
  r(ctx,  5,  2,  2,  1, G_HELM_HL);  // dome hot spot

  // Amber visor — 4-step with hot highlight
  r(ctx,  3,  5,  2,  5, G_VISOR_DD); // left deep shadow
  r(ctx,  5,  5,  9,  5, G_VISOR);    // main visor
  r(ctx, 14,  5,  2,  5, G_VISOR_D);  // right shadow
  r(ctx,  5,  5,  5,  2, G_VISOR_L);  // glint band
  r(ctx,  6,  5,  3,  1, G_VISOR_HL); // hot spot
  r(ctx,  6,  7,  2,  1, G_VISOR_L);  // secondary glint

  // Chin guard
  r(ctx,  4, 10, 11,  2, G_HELM);
  r(ctx,  4, 10,  1,  2, G_HELM_DD);
  r(ctx, 14, 10,  1,  2, G_HELM_DD);
  r(ctx,  5, 10,  4,  1, G_HELM_L);   // chin highlight

  // Neck armor
  r(ctx,  7, 12,  6,  2, G_ARMOR_D);

  // Wide shoulder plates
  r(ctx,  0, 14, 20,  3, G_ARMOR_L);
  r(ctx,  0, 14,  1,  3, G_ARMOR_DD);
  r(ctx, 19, 14,  1,  3, G_ARMOR_DD);
  r(ctx,  1, 14,  2,  3, G_ARMOR_D);
  r(ctx, 17, 14,  2,  3, G_ARMOR_D);
  r(ctx,  3, 14,  3,  1, G_ARMOR_HL); // left shoulder glint
  r(ctx, 14, 14,  3,  1, G_ARMOR_HL); // right shoulder glint
  r(ctx,  0, 16, 20,  1, G_ARMOR_M);  // shoulder bottom crease

  // Body armor — 5-step
  r(ctx,  2, 17, 16, 10, G_ARMOR);
  r(ctx,  2, 17,  2, 10, G_ARMOR_D);
  r(ctx, 16, 17,  2, 10, G_ARMOR_D);
  r(ctx,  2, 22,  2,  5, G_ARMOR_DD); // lower side deep shadow
  r(ctx, 16, 22,  2,  5, G_ARMOR_DD);
  r(ctx,  5, 17, 10,  4, G_ARMOR_L);  // chest plate highlight
  r(ctx,  7, 17,  5,  1, G_ARMOR_HL); // chest hot spot
  r(ctx,  4, 21,  3,  6, G_ARMOR_M);
  r(ctx, 13, 21,  3,  6, G_ARMOR_M);

  // Tactical straps — 2-step
  r(ctx,  6, 18,  2,  5, G_STRAP);
  r(ctx, 12, 18,  2,  5, G_STRAP);
  r(ctx,  6, 18,  1,  2, G_STRAP_L);  // strap catch light
  r(ctx, 12, 18,  1,  2, G_STRAP_L);

  // Ammo pouches — 2-step
  r(ctx,  4, 21,  4,  4, G_POUCH);
  r(ctx, 12, 21,  4,  4, G_POUCH);
  r(ctx,  5, 22,  2,  2, G_POUCH_L);  // pouch clasp
  r(ctx, 13, 22,  2,  2, G_POUCH_L);

  // Waist strap
  r(ctx,  3, 27, 14,  2, G_STRAP);
  r(ctx,  3, 27,  5,  1, G_STRAP_L);

  // Leg armor — 5-step
  r(ctx,  3, 29,  7,  8, G_ARMOR);
  r(ctx,  3, 29,  1,  8, G_ARMOR_DD);
  r(ctx,  4, 29,  1,  8, G_ARMOR_D);
  r(ctx,  9, 29,  1,  8, G_ARMOR_M);  // inner-leg crease
  r(ctx,  5, 29,  3,  2, G_ARMOR_L);  // left leg highlight
  r(ctx, 10, 29,  7,  8, G_ARMOR);
  r(ctx, 16, 29,  1,  8, G_ARMOR_DD);
  r(ctx, 15, 29,  1,  8, G_ARMOR_D);
  r(ctx, 11, 29,  3,  2, G_ARMOR_L);  // right leg highlight

  // Knee pads — 3-step
  r(ctx,  4, 32,  5,  3, G_KNEE);
  r(ctx, 11, 32,  5,  3, G_KNEE);
  r(ctx,  4, 32,  1,  3, G_KNEE_D);
  r(ctx, 11, 32,  1,  3, G_KNEE_D);
  r(ctx,  5, 32,  3,  1, G_KNEE_L);   // knee pad highlight

  // Heavy boots — 3-step (separate material read)
  r(ctx,  2, 37,  8,  3, G_BOOT);
  r(ctx,  2, 37,  1,  3, G_BOOT_DD);
  r(ctx,  3, 37,  3,  1, G_BOOT_L);   // boot toe highlight
  r(ctx,  2, 39,  9,  1, G_ARMOR_M);  // boot sole
  r(ctx, 10, 37,  8,  3, G_BOOT);
  r(ctx, 17, 37,  1,  3, G_BOOT_DD);
  r(ctx, 10, 37,  3,  1, G_BOOT_L);
  r(ctx, 10, 39,  9,  1, G_ARMOR_M);

  // Arms
  if (charging) {
    r(ctx, 17, 16,  5,  5, G_ARMOR);
    r(ctx, 17, 16,  1,  5, G_ARMOR_DD);
    r(ctx, 17, 16,  2,  2, G_ARMOR_D);
    r(ctx, 21, 18,  3,  4, G_ARMOR_M); // gauntlet
    r(ctx, 22, 18,  2,  1, G_ARMOR_HL); // gauntlet glint
  } else {
    r(ctx, 17, 18,  3,  8, G_ARMOR);
    r(ctx, 17, 18,  1,  8, G_ARMOR_DD);
    r(ctx, 18, 18,  1,  8, G_ARMOR_D);
    r(ctx, 17, 25,  4,  3, G_ARMOR_M); // glove
    r(ctx, 18, 25,  2,  1, G_ARMOR_L); // glove highlight
  }

  ctx.restore();
}

// ── Rifleman standing — 20 × 40 ──────────────────────────────────────────────
export function drawRiflemanStand(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Balaclava — 4-step (covers most of head, needs volume)
  r(ctx,  4,  0, 12,  1, R_BALA_L);
  r(ctx,  3,  1, 14,  4, R_BALA);
  r(ctx,  3,  1,  1,  4, R_BALA_DD);  // left deep shadow
  r(ctx, 16,  1,  1,  4, R_BALA_DD);
  r(ctx,  4,  1,  2,  4, R_BALA_D);   // left shadow
  r(ctx, 14,  1,  2,  4, R_BALA_D);
  r(ctx,  4,  1,  3,  2, R_BALA_L);   // dome shine
  r(ctx,  5,  1,  2,  1, R_BALA_L);   // dome secondary

  // Face opening
  r(ctx,  5,  5, 10,  5, R_SKIN);
  r(ctx,  5,  5,  1,  3, R_SKIN_D);   // cheek shadow
  r(ctx, 14,  5,  1,  3, R_SKIN_D);
  r(ctx,  6,  5,  3,  1, R_SKIN_L);   // brow highlight
  r(ctx,  6,  6,  3,  2, R_EYE);
  r(ctx, 11,  6,  3,  2, R_EYE);
  r(ctx,  7,  6,  1,  1, R_EYE_L);
  r(ctx, 12,  6,  1,  1, R_EYE_L);
  r(ctx,  6,  9,  3,  1, R_SKIN_D);   // mouth shadow
  r(ctx,  9,  9,  2,  1, R_SKIN_L);   // mouth highlight
  r(ctx, 11,  9,  3,  1, R_SKIN_D);

  // Balaclava frame around face
  r(ctx,  3,  5,  2,  5, R_BALA);
  r(ctx, 15,  5,  2,  5, R_BALA);
  r(ctx,  3,  5,  1,  5, R_BALA_D);   // cheek shadow
  r(ctx, 16,  5,  1,  5, R_BALA_D);
  r(ctx,  4, 10, 12,  2, R_BALA);
  r(ctx,  4, 10,  1,  2, R_BALA_D);

  // Neck
  r(ctx,  8, 12,  4,  2, R_BALA_D);

  // Tactical vest — 4-step
  r(ctx,  2, 14, 16,  2, R_VEST_L);
  r(ctx,  2, 14,  1,  2, R_VEST_DD);
  r(ctx, 17, 14,  1,  2, R_VEST_DD);
  r(ctx,  4, 14,  3,  1, R_VEST_HL);  // shoulder glint
  r(ctx,  3, 16, 14, 11, R_VEST);
  r(ctx,  3, 16,  2, 11, R_VEST_D);
  r(ctx, 15, 16,  2, 11, R_VEST_D);
  r(ctx,  3, 22,  2,  5, R_VEST_DD);  // lower side deep shadow
  r(ctx, 15, 22,  2,  5, R_VEST_DD);
  r(ctx,  6, 16,  8,  3, R_VEST_L);   // chest highlight
  r(ctx,  7, 16,  4,  1, R_VEST_HL);  // chest hot spot

  // Jacket sleeves — 4-step
  r(ctx,  1, 16,  2, 11, R_JACKET_L);
  r(ctx, 17, 16,  2, 11, R_JACKET_L);
  r(ctx,  1, 22,  1,  5, R_JACK_D);   // sleeve shadow
  r(ctx, 18, 22,  1,  5, R_JACK_D);

  // Vest pockets
  r(ctx,  5, 20,  4,  4, R_VEST_D);
  r(ctx, 11, 20,  4,  4, R_VEST_D);
  r(ctx,  6, 21,  2,  2, R_VEST_L);   // pocket buckle
  r(ctx,  6, 21,  1,  1, R_VEST_HL);  // buckle glint

  // Belt
  r(ctx,  3, 27, 14,  2, R_JACK_DD);
  r(ctx,  8, 27,  4,  2, R_JACK_D);   // buckle

  // Pants — 4-step blue-black
  r(ctx,  3, 29,  6,  9, R_PANTS);
  r(ctx,  3, 29,  1,  9, R_PANTS_DD);
  r(ctx,  4, 29,  1,  9, R_PANTS_D);
  r(ctx,  8, 29,  1,  9, R_PANTS_D);  // inner-leg shadow
  r(ctx,  4, 29,  3,  2, R_PANTS_L);  // thigh highlight
  r(ctx, 10, 29,  6,  9, R_PANTS);
  r(ctx, 15, 29,  1,  9, R_PANTS_DD);
  r(ctx, 14, 29,  1,  9, R_PANTS_D);
  r(ctx, 10, 29,  3,  2, R_PANTS_L);

  // Boots — 3-step
  r(ctx,  2, 38,  8,  2, R_BOOT);
  r(ctx,  2, 38,  1,  2, R_BOOT_DD);
  r(ctx,  3, 38,  3,  1, R_BOOT_L);   // toe highlight
  r(ctx,  2, 39,  8,  1, R_BOOT_DD);  // sole
  r(ctx, 10, 38,  8,  2, R_BOOT);
  r(ctx, 17, 38,  1,  2, R_BOOT_DD);
  r(ctx, 10, 38,  3,  1, R_BOOT_L);
  r(ctx, 10, 39,  8,  1, R_BOOT_DD);

  // Gun arm + weapon — 4-step metal
  r(ctx, 17, 17,  3,  8, R_JACKET_L);
  r(ctx, 17, 17,  1,  8, R_JACK_D);
  r(ctx, 20, 17,  3,  1, R_GUN_HL);   // receiver top glint
  r(ctx, 20, 18,  7,  2, R_GUN);
  r(ctx, 20, 18,  3,  1, R_GUN_L);    // barrel top highlight
  r(ctx, 21, 19,  5,  1, R_GUN_D);    // barrel underside
  r(ctx, 19, 17,  2,  3, R_GUN_D);    // receiver side
  r(ctx, 24, 20,  2,  1, R_GUN_DD);   // muzzle shadow

  ctx.restore();
}

// ── Rifleman crouching — 20 × 26 ─────────────────────────────────────────────
export function drawRiflemanCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Balaclava — 4-step
  r(ctx,  3,  0, 13,  1, R_BALA_L);
  r(ctx,  2,  1, 14,  3, R_BALA);
  r(ctx,  2,  1,  1,  3, R_BALA_DD);
  r(ctx,  3,  1,  1,  3, R_BALA_D);
  r(ctx, 15,  1,  1,  3, R_BALA_D);
  r(ctx,  3,  1,  3,  2, R_BALA_L);   // dome shine

  // Face
  r(ctx,  4,  4, 10,  3, R_SKIN);
  r(ctx,  4,  4,  1,  2, R_SKIN_D);
  r(ctx, 13,  4,  1,  2, R_SKIN_D);
  r(ctx,  5,  4,  3,  1, R_SKIN_L);   // brow highlight
  r(ctx,  5,  5,  3,  1, R_EYE);
  r(ctx,  9,  5,  3,  1, R_EYE);
  r(ctx,  6,  5,  1,  1, R_EYE_L);
  r(ctx, 10,  5,  1,  1, R_EYE_L);

  // Balaclava frame
  r(ctx,  2,  4,  2,  3, R_BALA);
  r(ctx,  2,  4,  1,  3, R_BALA_D);
  r(ctx, 14,  4,  2,  3, R_BALA);
  r(ctx, 15,  4,  1,  3, R_BALA_D);
  r(ctx,  3,  7, 12,  2, R_BALA);

  // Hunched vest — 4-step
  r(ctx,  1,  9, 17,  3, R_VEST_L);
  r(ctx,  1,  9,  2,  3, R_VEST_DD);
  r(ctx, 16,  9,  2,  3, R_VEST_DD);
  r(ctx,  3,  9,  3,  1, R_VEST_HL);  // hump glint
  r(ctx,  2, 12, 14,  6, R_VEST);
  r(ctx,  2, 12,  2,  6, R_VEST_D);
  r(ctx, 14, 12,  2,  6, R_VEST_D);
  r(ctx,  2, 15,  2,  3, R_VEST_DD);
  r(ctx, 14, 15,  2,  3, R_VEST_DD);
  r(ctx,  5, 12,  8,  3, R_VEST_L);
  r(ctx,  1, 12,  1,  6, R_JACKET_L);
  r(ctx, 17, 12,  1,  6, R_JACKET_L);

  // Belt
  r(ctx,  2, 18, 14,  1, R_JACK_DD);

  // Pants — 4-step
  r(ctx,  2, 19,  6,  6, R_PANTS);
  r(ctx,  2, 19,  1,  6, R_PANTS_DD);
  r(ctx,  3, 19,  2,  1, R_PANTS_L);
  r(ctx, 11, 19,  6,  6, R_PANTS);
  r(ctx, 16, 19,  1,  6, R_PANTS_DD);
  r(ctx, 11, 19,  2,  1, R_PANTS_L);

  // Boots
  r(ctx,  1, 24,  7,  2, R_BOOT);
  r(ctx,  1, 24,  1,  2, R_BOOT_DD);
  r(ctx,  2, 24,  3,  1, R_BOOT_L);
  r(ctx,  1, 25,  8,  1, R_BOOT_DD);
  r(ctx, 10, 24,  7,  2, R_BOOT);
  r(ctx, 16, 24,  1,  2, R_BOOT_DD);
  r(ctx, 10, 24,  3,  1, R_BOOT_L);
  r(ctx,  9, 25,  8,  1, R_BOOT_DD);

  // Gun arm
  r(ctx, 16, 12,  3,  5, R_JACKET_L);
  r(ctx, 16, 12,  1,  5, R_JACK_D);
  r(ctx, 19, 12,  3,  1, R_GUN_HL);
  r(ctx, 19, 13,  6,  2, R_GUN);
  r(ctx, 19, 13,  3,  1, R_GUN_L);
  r(ctx, 19, 14,  5,  1, R_GUN_D);

  ctx.restore();
}

// ── Fallen heap ───────────────────────────────────────────────────────────────
export function drawEnemyDead(ctx, bx, by, type) {
  const x = Math.round(bx);
  const y = Math.round(by);
  function rf(ox, oy, w, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(x + ox, y + oy, w, h);
  }
  if (type === 'grunt') {
    rf( 3, 20,  9,  5, G_HELM);
    rf( 3, 20,  1,  5, G_HELM_DD);
    rf( 5, 22,  7,  3, G_VISOR);
    rf( 5, 22,  4,  1, G_VISOR_L);
    rf( 6, 22,  2,  1, G_VISOR_HL);
    rf( 0, 25, 20,  9, G_ARMOR);
    rf( 0, 25,  2,  9, G_ARMOR_DD);
    rf(18, 25,  2,  9, G_ARMOR_DD);
    rf( 3, 26, 14,  3, G_ARMOR_L);
    rf( 5, 26,  5,  1, G_ARMOR_HL);
    rf( 0, 34,  8,  6, G_BOOT);
    rf( 0, 34,  1,  6, G_BOOT_DD);
    rf(12, 34,  8,  6, G_BOOT);
    rf(19, 34,  1,  6, G_BOOT_DD);
    rf( 0, 39, 20,  1, G_ARMOR_M);
  } else {
    rf( 3, 20, 10,  4, R_BALA);
    rf( 3, 20,  1,  4, R_BALA_DD);
    rf( 5, 22,  5,  2, R_SKIN);
    rf( 0, 24, 20,  9, R_VEST);
    rf( 0, 24,  2,  9, R_VEST_DD);
    rf(18, 24,  2,  9, R_VEST_DD);
    rf( 3, 25, 14,  3, R_VEST_L);
    rf( 5, 25,  4,  1, R_VEST_HL);
    rf( 1, 33, 18,  5, R_PANTS);
    rf( 1, 33,  2,  5, R_PANTS_DD);
    rf(17, 33,  2,  5, R_PANTS_DD);
    rf( 0, 37,  7,  3, R_BOOT);
    rf( 0, 37,  1,  3, R_BOOT_DD);
    rf(13, 37,  7,  3, R_BOOT);
    rf(19, 37,  1,  3, R_BOOT_DD);
    rf( 0, 39, 20,  1, R_BOOT_DD);
  }
}
