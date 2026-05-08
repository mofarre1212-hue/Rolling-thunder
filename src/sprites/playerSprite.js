import { PLAYER_W } from '../constants.js';

// ── Palette ───────────────────────────────────────────────────────────────────
// Hair — 3-step warm-to-cool
const HAIR_DD  = '#060404';
const HAIR     = '#1a1008';
const HAIR_L   = '#2e1c10';

// Skin — 5-step warm hue shift
const SKIN_DD  = '#a06030';
const SKIN_D   = '#c08040';
const SKIN     = '#e8a860';
const SKIN_L   = '#f4c080';
const SKIN_LL  = '#fcd8a8';

// Eye
const EYE      = '#060402';
const EYE_L    = '#c8a870';

// Shirt
const SHIRT    = '#e8e4d4';
const SHIRT_D  = '#b8b4a4';

// Jacket — 6-step with cool-purple shadow and orange-red highlight
const JACKET_DD = '#2c0410';   // cool purple-dark shadow
const JACKET_D  = '#5c0808';   // dark maroon
const JACKET_M  = '#8a1010';   // mid red
const JACKET    = '#b81818';   // base red
const JACKET_L  = '#d83020';   // bright red
const JACKET_HL = '#ee5030';   // orange-shifted hot spot

// Pants — 5-step with blue shift
const PANTS_DD = '#121420';   // blue-black
const PANTS_D  = '#242638';   // cool shadow
const PANTS    = '#444660';   // base
const PANTS_L  = '#606278';   // lighter
const PANTS_HL = '#7a7c94';   // blue-shifted highlight

// Belt and buckle
const BELT     = '#181008';
const BELT_L   = '#282010';
const BKL      = '#c89010';
const BKL_L    = '#f0c030';

// Boots — 5-step warm leather
const BOOTS_DD = '#060404';
const BOOTS_D  = '#110e08';
const BOOTS    = '#201810';   // warm leather dark
const BOOTS_L  = '#342818';
const BOOTS_HL = '#483820';   // warm brown highlight

// Gun — 5-step cool metal
const GUN_DD   = '#1e2028';   // cool near-black
const GUN_D    = '#404448';   // dark cool gray
const GUN      = '#6a6e78';   // base
const GUN_L    = '#909498';   // light
const GUN_HL   = '#bcc0cc';   // blue-white glint

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

  // Hair — 3-step ramp
  r(ctx,  5,  0, 10,  1, HAIR_L);
  r(ctx,  4,  1, 12,  2, HAIR);
  r(ctx,  4,  3,  1,  3, HAIR_DD);   // left sideburn deep shadow
  r(ctx, 15,  3,  1,  3, HAIR_DD);   // right sideburn deep shadow
  r(ctx,  5,  1,  4,  1, HAIR_L);    // crown glint

  // Face — 5-step skin ramp
  r(ctx,  5,  3, 10,  1, SKIN_L);        // forehead
  r(ctx,  4,  4, 12,  5, SKIN);          // main face
  r(ctx,  4,  4,  1,  3, SKIN_D);        // left temple shadow
  r(ctx, 15,  4,  1,  3, SKIN_D);        // right temple shadow
  r(ctx,  5,  4,  4,  1, SKIN_LL);       // brow highlight
  r(ctx,  6,  5,  3,  2, EYE);           // left eye socket
  r(ctx, 11,  5,  3,  2, EYE);           // right eye socket
  r(ctx,  7,  5,  1,  1, EYE_L);         // left eye glint
  r(ctx, 12,  5,  1,  1, EYE_L);         // right eye glint
  r(ctx,  5,  8,  4,  1, SKIN_D);        // left jaw shadow
  r(ctx, 11,  8,  4,  1, SKIN_D);        // right jaw shadow
  r(ctx,  7,  9,  1,  1, SKIN_DD);       // chin notch

  // Neck
  r(ctx,  9, 10,  2,  2, SKIN_D);

  // Shirt collar
  r(ctx,  7, 12,  6,  3, SHIRT);
  r(ctx,  6, 14,  8,  1, SHIRT);
  r(ctx,  7, 14,  3,  1, SHIRT_D);   // collar shadow

  // ── Jacket — 6-step ramp ─────────────────────────────────────────────────
  // Shoulder caps
  r(ctx,  1, 14, 18,  3, JACKET_L);  // shoulder highlight strip
  r(ctx,  1, 14,  2,  3, JACKET_DD); // left shoulder deep shadow
  r(ctx, 17, 14,  2,  3, JACKET_DD); // right shoulder deep shadow
  r(ctx,  3, 14,  2,  1, JACKET_HL); // left shoulder glint
  r(ctx, 15, 14,  2,  1, JACKET_HL); // right shoulder glint

  // Upper body
  r(ctx,  2, 17, 16, 10, JACKET);
  r(ctx,  2, 17,  2, 10, JACKET_D);
  r(ctx, 16, 17,  2, 10, JACKET_D);
  r(ctx,  2, 24,  2,  3, JACKET_DD); // lower side deep shadow
  r(ctx, 16, 24,  2,  3, JACKET_DD);
  r(ctx,  5, 17, 10,  3, JACKET_L);  // chest highlight
  r(ctx,  6, 17,  4,  1, JACKET_HL); // chest hot spot
  r(ctx,  4, 21,  3,  6, JACKET_M);  // left mid panel
  r(ctx, 13, 21,  3,  6, JACKET_M);  // right mid panel

  // Lapels
  r(ctx,  8, 15,  4,  9, SHIRT);       // shirt V-neck
  r(ctx,  7, 15,  2,  9, JACKET_L);    // left lapel face
  r(ctx, 11, 15,  2,  9, JACKET_L);    // right lapel face
  r(ctx,  8, 15,  1,  9, JACKET_M);    // left lapel inner edge
  r(ctx, 11, 15,  1,  9, JACKET_M);    // right lapel inner edge

  // Belt
  r(ctx,  3, 27, 14,  2, BELT);
  r(ctx,  3, 27,  3,  1, BELT_L);    // belt highlight
  r(ctx,  8, 27,  5,  2, BKL);
  r(ctx,  8, 27,  2,  1, BKL_L);     // buckle glint

  // ── Pants — 5-step blue-shifted ramp ─────────────────────────────────────
  const [lyL, lhL, lyR, lhR] = frame === 0
    ? [30, 9, 33, 6]
    : [33, 6, 30, 9];
  r(ctx,  7, lyL,  3, lhL, PANTS);
  r(ctx,  7, lyL,  1, lhL, PANTS_D);
  r(ctx,  9, lyL,  1, lhL, PANTS_HL); // forward-leg seam highlight
  r(ctx, 11, lyR,  3, lhR, PANTS);
  r(ctx, 13, lyR,  1, lhR, PANTS_D);
  // Thigh shading
  r(ctx,  7, 29,  3,  2, PANTS_L);
  r(ctx, 11, 29,  3,  2, PANTS_L);

  // Coat flaps (long-coat silhouette)
  r(ctx,  2, 29,  5, 10, JACKET);
  r(ctx,  2, 29,  2, 10, JACKET_D);
  r(ctx,  2, 32,  2,  7, JACKET_DD); // flap deep shadow base
  r(ctx,  4, 29,  1, 10, JACKET_L);  // left flap highlight
  r(ctx, 13, 29,  5, 10, JACKET);
  r(ctx, 16, 29,  2, 10, JACKET_D);
  r(ctx, 16, 32,  2,  7, JACKET_DD);
  r(ctx, 13, 29,  1, 10, JACKET_L);  // right flap highlight

  // ── Boots — 5-step warm leather ──────────────────────────────────────────
  r(ctx,  5, 37,  6,  3, BOOTS);
  r(ctx,  5, 37,  1,  3, BOOTS_DD);  // inner shadow
  r(ctx,  6, 37,  2,  1, BOOTS_HL);  // toe cap highlight
  r(ctx,  5, 39,  7,  1, BOOTS_D);   // left sole
  r(ctx, 11, 37,  6,  3, BOOTS);
  r(ctx, 16, 37,  1,  3, BOOTS_DD);
  r(ctx, 11, 37,  2,  1, BOOTS_HL);  // toe cap highlight
  r(ctx, 10, 39,  7,  1, BOOTS_D);   // right sole

  // ── Gun arm — 5-step cool metal ──────────────────────────────────────────
  r(ctx, 18, 19,  3,  7, JACKET);
  r(ctx, 18, 19,  1,  7, JACKET_D);
  r(ctx, 21, 19,  3,  1, GUN_HL);    // receiver top glint
  r(ctx, 21, 20,  7,  2, GUN);       // barrel body
  r(ctx, 21, 20,  3,  1, GUN_L);     // barrel top highlight
  r(ctx, 21, 21,  6,  1, GUN_D);     // barrel underside
  r(ctx, 20, 19,  2,  3, GUN_D);     // receiver shadow side
  r(ctx, 23, 22,  3,  1, GUN_DD);    // muzzle shadow

  ctx.restore();
}

// ── Crouching pose — 20 × 26 ──────────────────────────────────────────────────
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Hair
  r(ctx,  4,  0, 11,  1, HAIR_L);
  r(ctx,  3,  1, 12,  2, HAIR);
  r(ctx,  3,  3,  1,  2, HAIR_DD);

  // Face — angled down
  r(ctx,  4,  3, 10,  1, SKIN_L);
  r(ctx,  3,  4, 11,  3, SKIN);
  r(ctx,  3,  4,  1,  2, SKIN_D);
  r(ctx, 13,  4,  1,  2, SKIN_D);
  r(ctx,  5,  5,  3,  1, EYE);
  r(ctx,  9,  5,  3,  1, EYE);
  r(ctx,  6,  5,  1,  1, EYE_L);
  r(ctx, 10,  5,  1,  1, EYE_L);
  r(ctx,  4,  7,  3,  1, SKIN_DD);
  r(ctx,  8,  7,  3,  1, SKIN_D);

  // Shirt collar
  r(ctx,  6,  8,  5,  1, SHIRT);

  // Jacket — hunch silhouette
  r(ctx,  1,  8, 17,  3, JACKET_L);  // shoulder hump highlight
  r(ctx,  3,  8,  2,  1, JACKET_HL); // left hump glint
  r(ctx,  1,  8,  2,  3, JACKET_DD); // left deep shadow
  r(ctx, 16,  8,  2,  3, JACKET_DD); // right deep shadow

  // Coat body (compressed)
  r(ctx,  2, 11, 14,  7, JACKET);
  r(ctx,  2, 11,  2,  7, JACKET_D);
  r(ctx, 14, 11,  2,  7, JACKET_D);
  r(ctx,  2, 15,  2,  3, JACKET_DD);
  r(ctx, 14, 15,  2,  3, JACKET_DD);
  r(ctx,  5, 11,  8,  3, JACKET_L);  // chest highlight
  r(ctx,  6, 11,  3,  1, JACKET_HL); // chest hot spot
  r(ctx,  4, 14,  3,  4, JACKET_M);
  r(ctx, 11, 14,  3,  4, JACKET_M);

  // Lapels
  r(ctx,  7,  9,  4,  8, SHIRT);
  r(ctx,  6,  9,  2,  8, JACKET_L);
  r(ctx, 10,  9,  2,  8, JACKET_L);
  r(ctx,  7,  9,  1,  8, JACKET_M);
  r(ctx, 10,  9,  1,  8, JACKET_M);

  // Belt
  r(ctx,  2, 18, 14,  1, BELT);
  r(ctx,  7, 18,  4,  1, BKL);
  r(ctx,  7, 18,  2,  1, BKL_L);

  // Pants — bent knee, blue ramp
  r(ctx,  3, 19,  5,  5, PANTS);
  r(ctx,  3, 19,  1,  5, PANTS_DD);
  r(ctx,  4, 19,  2,  1, PANTS_HL);
  r(ctx, 11, 19,  5,  5, PANTS);
  r(ctx, 15, 19,  1,  5, PANTS_DD);
  r(ctx, 11, 19,  2,  1, PANTS_HL);

  // Boots — flat on ground
  r(ctx,  2, 23,  7,  3, BOOTS);
  r(ctx,  2, 23,  1,  3, BOOTS_DD);
  r(ctx,  3, 23,  3,  1, BOOTS_HL);
  r(ctx,  2, 25,  7,  1, BOOTS_D);
  r(ctx, 10, 23,  7,  3, BOOTS);
  r(ctx, 16, 23,  1,  3, BOOTS_DD);
  r(ctx, 10, 23,  3,  1, BOOTS_HL);
  r(ctx, 10, 25,  7,  1, BOOTS_D);

  // Gun arm (lowered, aimed flat)
  r(ctx, 16, 12,  3,  5, JACKET);
  r(ctx, 16, 12,  1,  5, JACKET_D);
  r(ctx, 19, 12,  3,  1, GUN_HL);
  r(ctx, 19, 13,  6,  2, GUN);
  r(ctx, 19, 13,  3,  1, GUN_L);
  r(ctx, 19, 14,  5,  1, GUN_D);

  ctx.restore();
}
