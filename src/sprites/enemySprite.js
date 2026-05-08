import { ENEMY_W } from '../constants.js';

// ── Grunt palette — olive armored brawler, full amber visor ──────────────────
const G_HELM    = '#1c2e10';
const G_HELM_D  = '#0e1c08';
const G_HELM_L  = '#2e4818';
const G_VISOR   = '#c87800';
const G_VISOR_L = '#ffaa20';
const G_VISOR_D = '#804800';
const G_ARMOR   = '#283018';
const G_ARMOR_D = '#182010';
const G_ARMOR_L = '#384820';
const G_ARMOR_M = '#202810';
const G_STRAP   = '#141208';
const G_POUCH   = '#1e2410';
const G_KNEE    = '#202c14';
const G_BOOT    = '#0c100a';

// ── Rifleman palette — dark tactical operative, balaclava ────────────────────
const R_BALA    = '#141010';   // balaclava
const R_BALA_L  = '#201818';
const R_SKIN    = '#d0a058';   // face skin in opening
const R_SKIN_D  = '#a07838';
const R_EYE     = '#080404';
const R_VEST    = '#202c18';   // tactical vest
const R_VEST_L  = '#304020';
const R_VEST_D  = '#141c10';
const R_JACKET  = '#383028';   // uniform jacket
const R_JACKET_D = '#282018';
const R_JACKET_L = '#4a4038';
const R_PANTS   = '#1c1c2c';
const R_PANTS_D = '#121220';
const R_BOOT    = '#141010';
const R_GUN     = '#686870';
const R_GUN_D   = '#383840';
const R_GUN_L   = '#9898a8';

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
// charging=true gives the melee-rush lean with arms extended
export function drawGruntStand(ctx, bx, by, facing, charging) {
  beginSprite(ctx, bx, by, facing);

  // Helmet — wide, rounded, imposing
  r(ctx,  3,  0, 14,  1, G_HELM_L);  // dome top highlight
  r(ctx,  2,  1, 16,  4, G_HELM);
  r(ctx,  2,  1,  1,  4, G_HELM_D);
  r(ctx, 17,  1,  1,  4, G_HELM_D);
  r(ctx,  4,  2,  4,  2, G_HELM_L);  // left dome shine

  // Amber visor (large, full face coverage)
  r(ctx,  3,  5,  2,  5, G_VISOR_D);  // left shadow
  r(ctx,  5,  5,  9,  5, G_VISOR);    // main visor
  r(ctx, 14,  5,  2,  5, G_VISOR_D);  // right shadow
  r(ctx,  5,  5,  5,  2, G_VISOR_L);  // glint top
  r(ctx,  6,  7,  2,  1, G_VISOR_L);  // glint secondary

  // Chin guard
  r(ctx,  4, 10, 11,  2, G_HELM);
  r(ctx,  4, 10,  1,  2, G_HELM_D);
  r(ctx, 14, 10,  1,  2, G_HELM_D);

  // Neck armor
  r(ctx,  7, 12,  6,  2, G_ARMOR_D);

  // Wide shoulder plates — full 20px span
  r(ctx,  0, 14, 20,  3, G_ARMOR_L);
  r(ctx,  0, 14,  1,  3, G_ARMOR_D);
  r(ctx, 19, 14,  1,  3, G_ARMOR_D);
  r(ctx,  0, 16, 20,  1, G_ARMOR_M);  // shoulder bottom crease

  // Body armor (tactical vest)
  r(ctx,  2, 17, 16, 10, G_ARMOR);
  r(ctx,  2, 17,  2, 10, G_ARMOR_D);
  r(ctx, 16, 17,  2, 10, G_ARMOR_D);
  r(ctx,  5, 17, 10,  4, G_ARMOR_L);  // chest plate highlight
  r(ctx,  4, 21,  3,  6, G_ARMOR_M);
  r(ctx, 13, 21,  3,  6, G_ARMOR_M);

  // Tactical straps + ammo pouches
  r(ctx,  6, 18,  2,  5, G_STRAP);   // left shoulder strap
  r(ctx, 12, 18,  2,  5, G_STRAP);   // right shoulder strap
  r(ctx,  4, 21,  4,  4, G_POUCH);   // left chest pouch
  r(ctx, 12, 21,  4,  4, G_POUCH);   // right chest pouch
  r(ctx,  5, 22,  2,  2, G_ARMOR_L); // pouch clasp detail
  r(ctx, 13, 22,  2,  2, G_ARMOR_L);

  // Waist
  r(ctx,  3, 27, 14,  2, G_STRAP);

  // Leg armor
  r(ctx,  3, 29,  7,  8, G_ARMOR);
  r(ctx,  3, 29,  1,  8, G_ARMOR_D);
  r(ctx,  9, 29,  1,  8, G_ARMOR_M);  // inner-leg crease
  r(ctx, 10, 29,  7,  8, G_ARMOR);
  r(ctx, 16, 29,  1,  8, G_ARMOR_D);

  // Knee pads
  r(ctx,  4, 32,  5,  3, G_KNEE);
  r(ctx, 11, 32,  5,  3, G_KNEE);
  r(ctx,  5, 32,  3,  1, G_ARMOR_L); // knee pad highlight

  // Heavy boots
  r(ctx,  2, 37,  8,  3, G_BOOT);
  r(ctx,  2, 37,  1,  3, G_ARMOR_D);
  r(ctx,  2, 39,  9,  1, G_ARMOR_M); // boot sole
  r(ctx, 10, 37,  8,  3, G_BOOT);
  r(ctx, 17, 37,  1,  3, G_ARMOR_D);
  r(ctx, 10, 39,  9,  1, G_ARMOR_M);

  // Arms
  if (charging) {
    // Right arm thrust forward, leaning into strike
    r(ctx, 17, 16,  5,  5, G_ARMOR);
    r(ctx, 17, 16,  1,  5, G_ARMOR_D);
    r(ctx, 21, 18,  3,  4, G_ARMOR_M); // gauntlet
    r(ctx, 22, 19,  2,  2, G_ARMOR_L); // gauntlet glint
  } else {
    // Right arm at side
    r(ctx, 17, 18,  3,  8, G_ARMOR);
    r(ctx, 17, 18,  1,  8, G_ARMOR_D);
    r(ctx, 17, 25,  4,  3, G_ARMOR_M); // glove
  }

  ctx.restore();
}

// ── Rifleman standing — 20 × 40 ──────────────────────────────────────────────
export function drawRiflemanStand(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Balaclava
  r(ctx,  4,  0, 12,  1, R_BALA_L);
  r(ctx,  3,  1, 14,  4, R_BALA);
  r(ctx,  3,  1,  1,  4, '#0c0808');
  r(ctx, 16,  1,  1,  4, '#0c0808');
  r(ctx,  4,  1,  3,  2, R_BALA_L);  // dome shine

  // Face opening (eyes + skin visible through balaclava)
  r(ctx,  5,  5, 10,  5, R_SKIN);    // exposed face
  r(ctx,  5,  5,  1,  3, R_SKIN_D);  // cheek shadow
  r(ctx, 14,  5,  1,  3, R_SKIN_D);
  r(ctx,  6,  6,  3,  2, R_EYE);     // left eye
  r(ctx, 11,  6,  3,  2, R_EYE);     // right eye
  r(ctx,  7,  6,  1,  1, '#c0a880'); // eye glint L
  r(ctx, 12,  6,  1,  1, '#c0a880'); // eye glint R
  r(ctx,  6,  9,  3,  1, R_SKIN_D);  // mouth shadow
  r(ctx,  9,  9,  2,  1, '#c89060'); // teeth/mouth
  r(ctx, 11,  9,  3,  1, R_SKIN_D);

  // Balaclava around face
  r(ctx,  3,  5,  2,  5, R_BALA);   // left cheek cover
  r(ctx, 15,  5,  2,  5, R_BALA);   // right cheek cover
  r(ctx,  4, 10, 12,  2, R_BALA);   // chin/jaw cover

  // Neck
  r(ctx,  8, 12,  4,  2, R_BALA);

  // Tactical vest (over jacket)
  r(ctx,  2, 14, 16,  2, R_VEST_L); // vest shoulder top
  r(ctx,  2, 14,  1,  2, R_VEST_D);
  r(ctx, 17, 14,  1,  2, R_VEST_D);
  r(ctx,  3, 16, 14, 11, R_VEST);
  r(ctx,  3, 16,  2, 11, R_VEST_D);
  r(ctx, 15, 16,  2, 11, R_VEST_D);
  r(ctx,  6, 16,  8,  3, R_VEST_L); // chest highlight

  // Jacket sleeves (visible beside vest)
  r(ctx,  1, 16,  2, 11, R_JACKET_L); // left sleeve
  r(ctx, 17, 16,  2, 11, R_JACKET_L); // right sleeve

  // Vest pockets/detail
  r(ctx,  5, 20,  4,  4, R_VEST_D); // left pocket
  r(ctx, 11, 20,  4,  4, R_VEST_D); // right pocket
  r(ctx,  6, 21,  2,  2, R_VEST_L); // pocket buckle

  // Belt
  r(ctx,  3, 27, 14,  2, '#181808');
  r(ctx,  8, 27,  4,  2, '#302808');  // buckle

  // Pants
  r(ctx,  3, 29,  6,  9, R_PANTS);
  r(ctx,  3, 29,  1,  9, R_PANTS_D);
  r(ctx,  8, 29,  1,  9, R_PANTS_D);  // inner-leg shadow
  r(ctx, 10, 29,  6,  9, R_PANTS);
  r(ctx, 15, 29,  1,  9, R_PANTS_D);

  // Boots
  r(ctx,  2, 38,  8,  2, R_BOOT);
  r(ctx,  2, 38,  1,  2, '#0a0808');
  r(ctx,  2, 39,  8,  1, '#0a0808'); // sole
  r(ctx, 10, 38,  8,  2, R_BOOT);
  r(ctx, 17, 38,  1,  2, '#0a0808');
  r(ctx, 10, 39,  8,  1, '#0a0808');

  // Gun arm + weapon
  r(ctx, 17, 17,  3,  8, R_JACKET_L); // right sleeve
  r(ctx, 17, 17,  1,  8, R_JACKET_D);
  r(ctx, 20, 17,  3,  1, R_GUN_L);    // receiver top
  r(ctx, 20, 18,  7,  2, R_GUN);      // barrel
  r(ctx, 21, 19,  5,  1, R_GUN_D);    // barrel underside
  r(ctx, 24, 20,  2,  1, R_GUN_D);    // muzzle shadow

  ctx.restore();
}

// ── Rifleman crouching — 20 × 26 ─────────────────────────────────────────────
export function drawRiflemanCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Balaclava (head bowed forward)
  r(ctx,  3,  0, 13,  1, R_BALA_L);
  r(ctx,  2,  1, 14,  3, R_BALA);
  r(ctx,  3,  1,  3,  2, R_BALA_L);  // dome shine

  // Face (angled down)
  r(ctx,  4,  4, 10,  3, R_SKIN);
  r(ctx,  4,  4,  1,  2, R_SKIN_D);
  r(ctx, 13,  4,  1,  2, R_SKIN_D);
  r(ctx,  5,  5,  3,  1, R_EYE);
  r(ctx,  9,  5,  3,  1, R_EYE);
  r(ctx,  6,  5,  1,  1, '#c0a880');
  r(ctx, 10,  5,  1,  1, '#c0a880');

  // Balaclava frame
  r(ctx,  2,  4,  2,  3, R_BALA);
  r(ctx, 14,  4,  2,  3, R_BALA);
  r(ctx,  3,  7, 12,  2, R_BALA);

  // Hunched vest
  r(ctx,  1,  9, 17,  3, R_VEST_L);  // shoulder hump
  r(ctx,  1,  9,  2,  3, R_VEST_D);
  r(ctx, 16,  9,  2,  3, R_VEST_D);
  r(ctx,  2, 12, 14,  6, R_VEST);
  r(ctx,  2, 12,  2,  6, R_VEST_D);
  r(ctx, 14, 12,  2,  6, R_VEST_D);
  r(ctx,  5, 12,  8,  3, R_VEST_L);
  r(ctx,  1, 12,  1,  6, R_JACKET_L); // left sleeve
  r(ctx, 17, 12,  1,  6, R_JACKET_L); // right sleeve

  // Belt
  r(ctx, 2, 18, 14, 1, '#181808');

  // Pants
  r(ctx,  2, 19,  6,  6, R_PANTS);
  r(ctx,  2, 19,  1,  6, R_PANTS_D);
  r(ctx, 11, 19,  6,  6, R_PANTS);
  r(ctx, 16, 19,  1,  6, R_PANTS_D);

  // Boots (flat)
  r(ctx,  1, 24,  7,  2, R_BOOT);
  r(ctx,  1, 25,  8,  1, '#0a0808');
  r(ctx, 10, 24,  7,  2, R_BOOT);
  r(ctx,  9, 25,  8,  1, '#0a0808');

  // Gun arm (lowered, aimed flat)
  r(ctx, 16, 12,  3,  5, R_JACKET_L);
  r(ctx, 16, 12,  1,  5, R_JACKET_D);
  r(ctx, 19, 12,  3,  1, R_GUN_L);
  r(ctx, 19, 13,  6,  2, R_GUN);
  r(ctx, 19, 14,  5,  1, R_GUN_D);

  ctx.restore();
}

// ── Fallen heap — entity top is by; entity height is ENEMY_H (40) ─────────────
export function drawEnemyDead(ctx, bx, by, type) {
  const x = Math.round(bx);
  const y = Math.round(by);
  function rf(ox, oy, w, h, col) {
    ctx.fillStyle = col;
    ctx.fillRect(x + ox, y + oy, w, h);
  }
  if (type === 'grunt') {
    // Helmet rolls to side — visor visible
    rf( 3, 20,  9,  5, G_HELM);
    rf( 5, 22,  7,  3, G_VISOR);
    rf( 5, 22,  4,  1, G_VISOR_L);   // visor glint
    // Armor heap spread across lower half
    rf( 0, 25, 20,  9, G_ARMOR);
    rf( 0, 25,  2,  9, G_ARMOR_D);
    rf(18, 25,  2,  9, G_ARMOR_D);
    rf( 3, 26, 14,  3, G_ARMOR_L);   // chest plate visible
    // Boots sprawled
    rf( 0, 34,  8,  6, G_BOOT);
    rf(12, 34,  8,  6, G_BOOT);
    rf( 0, 39, 20,  1, G_ARMOR_M);   // ground shadow
  } else {
    // Balaclava face-down
    rf( 3, 20, 10,  4, R_BALA);
    rf( 5, 22,  5,  2, R_SKIN);
    // Vest/jacket spread
    rf( 0, 24, 20,  9, R_VEST);
    rf( 0, 24,  2,  9, R_VEST_D);
    rf(18, 24,  2,  9, R_VEST_D);
    rf( 3, 25, 14,  3, R_VEST_L);    // chest visible
    // Pants
    rf( 1, 33, 18,  5, R_PANTS);
    // Boots
    rf( 0, 37,  7,  3, R_BOOT);
    rf(13, 37,  7,  3, R_BOOT);
    rf( 0, 39, 20,  1, '#0a0808');   // ground shadow
  }
}
