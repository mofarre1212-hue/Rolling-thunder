import { PLAYER_W } from '../constants.js';

// ── Palette ───────────────────────────────────────────────────────────────────
const HAIR_DD  = '#060404';
const HAIR     = '#1a1008';
const HAIR_L   = '#2e1c10';

const SKIN_DD  = '#a06030';
const SKIN_D   = '#c08040';
const SKIN     = '#e8a860';
const SKIN_L   = '#f4c080';
const SKIN_LL  = '#fcd8a8';

const EYE      = '#060402';
const EYE_L    = '#c8a870';

const SHIRT    = '#e8e4d4';
const SHIRT_D  = '#b8b4a4';

const JACKET_DD = '#2c0410';
const JACKET_D  = '#5c0808';
const JACKET_M  = '#8a1010';
const JACKET    = '#b81818';
const JACKET_L  = '#d83020';
const JACKET_HL = '#ee5030';

const PANTS_DD = '#121420';
const PANTS_D  = '#242638';
const PANTS    = '#444660';
const PANTS_L  = '#606278';

const BELT     = '#181008';
const BELT_L   = '#282010';
const BKL      = '#c89010';
const BKL_L    = '#f0c030';

const BOOTS_DD = '#060404';
const BOOTS_D  = '#110e08';
const BOOTS    = '#201810';
const BOOTS_L  = '#342818';
const BOOTS_HL = '#483820';

const GUN_DD   = '#1e2028';
const GUN_D    = '#404448';
const GUN      = '#6a6e78';
const GUN_L    = '#909498';
const GUN_HL   = '#bcc0cc';

const GLOVE_DD = '#060404';
const GLOVE_D  = '#1a1410';
const GLOVE    = '#2e221a';
const GLOVE_L  = '#3e3028';

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

// ── Standing pose — 24 × 44, side-profile right-facing ────────────────────────
// Back of figure (left edge x≈2) = back of body. Front (right edge x≈22) = gun side.
export function drawPlayerStand(ctx, bx, by, facing, frame) {
  beginSprite(ctx, bx, by, facing);

  // ── HEAD: side profile, face points right ─────────────────────────────────
  r(ctx,  4,  0,  8,  1, HAIR_L);    // crown highlight
  r(ctx,  3,  1,  9,  2, HAIR);      // crown mass
  r(ctx,  3,  1,  1,  9, HAIR_DD);   // back-of-head shadow column
  r(ctx,  4,  3,  3,  5, HAIR_DD);   // nape mass

  r(ctx, 10,  1,  4,  2, SKIN_LL);   // forehead catch-light
  r(ctx,  8,  3,  7,  6, SKIN);      // face block
  r(ctx,  8,  3,  1,  6, SKIN_D);    // cheek-back shadow (profile recession)
  r(ctx,  9,  3,  2,  1, SKIN_L);    // brow ridge

  r(ctx, 11,  4,  3,  1, SKIN_DD);   // brow shadow over eye
  r(ctx, 11,  5,  2,  1, EYE);       // iris (single eye, front side only)
  r(ctx, 11,  5,  1,  1, EYE_L);     // eye glint

  r(ctx, 14,  5,  1,  2, SKIN_D);    // nose bridge (profile edge)
  r(ctx, 15,  7,  1,  1, SKIN_DD);   // nose tip protrusion

  r(ctx,  8,  7,  6,  2, SKIN);      // jaw
  r(ctx,  8,  7,  1,  2, SKIN_D);    // jaw back shadow
  r(ctx, 10,  9,  3,  1, SKIN_D);    // jawline taper
  r(ctx, 11, 10,  2,  1, SKIN_DD);   // chin

  // Neck
  r(ctx,  9, 11,  4,  2, SKIN_D);

  // ── COLLAR / SHIRT visible at neckline ────────────────────────────────────
  r(ctx,  9, 13,  7,  2, SHIRT);
  r(ctx,  9, 13,  1,  2, SHIRT_D);   // collar back shadow

  // ── BACK SHOULDER ─────────────────────────────────────────────────────────
  r(ctx,  2, 15, 10,  3, JACKET_D);
  r(ctx,  2, 15,  1,  3, JACKET_DD);
  r(ctx, 11, 15,  1,  3, JACKET);    // shoulder / body boundary edge

  // ── FRONT SHOULDER CAP ────────────────────────────────────────────────────
  r(ctx, 14, 15,  8,  3, JACKET_L);
  r(ctx, 21, 15,  1,  3, JACKET_DD); // cap outer edge shadow
  r(ctx, 14, 15,  5,  1, JACKET_HL); // glint row across cap top
  r(ctx, 15, 15,  2,  1, JACKET_HL); // hot spot concentration

  // ── JACKET BODY ───────────────────────────────────────────────────────────
  r(ctx,  3, 18, 16, 10, JACKET);           // base fill
  r(ctx,  3, 18,  2, 10, JACKET_DD);        // back deep shadow
  r(ctx,  5, 18,  2, 10, JACKET_D);         // back shadow band
  r(ctx, 16, 18,  3, 10, JACKET_D);         // front shadow band
  r(ctx, 16, 23,  3,  5, JACKET_DD);        // front lower deep shadow
  r(ctx,  7, 18,  5,  4, JACKET_L);         // chest catch-light
  r(ctx,  8, 18,  3,  2, JACKET_HL);        // chest hotspot
  r(ctx,  5, 23,  3,  5, JACKET_M);         // back waist panel
  r(ctx, 13, 23,  3,  5, JACKET_M);         // front waist panel
  r(ctx,  8, 22,  5,  2, JACKET_L);         // center-chest horizontal seam

  // Shirt + lapels — continuous V-strip from collar to belt
  r(ctx, 11, 13,  2, 15, SHIRT);            // shirt in V-opening
  r(ctx, 13, 13,  3, 15, JACKET_L);         // lapel front face
  r(ctx, 10, 13,  1, 15, JACKET_M);         // lapel inner shadow

  // ── BELT ──────────────────────────────────────────────────────────────────
  r(ctx,  4, 28, 14,  2, BELT);
  r(ctx,  4, 28,  4,  1, BELT_L);           // belt top catch-light
  r(ctx,  8, 28,  5,  2, BKL);              // buckle plate
  r(ctx,  8, 28,  3,  1, BKL_L);            // buckle glint

  // ── BACK ARM (behind body) ─────────────────────────────────────────────────
  // Upper arm — tonal break at x=4 separates arm from jacket body
  r(ctx,  2, 18,  3,  9, JACKET_D);
  r(ctx,  2, 18,  1,  9, JACKET_DD);
  r(ctx,  4, 18,  1,  9, JACKET_M);
  // Forearm — slight tonal shift implies elbow bend
  r(ctx,  2, 27,  3,  5, JACKET_D);
  r(ctx,  2, 27,  1,  5, JACKET_DD);
  r(ctx,  4, 27,  1,  5, JACKET_M);
  // Gloved hand
  r(ctx,  2, 32,  4,  3, GLOVE_D);
  r(ctx,  2, 32,  1,  3, GLOVE_DD);
  r(ctx,  5, 32,  1,  2, GLOVE);            // knuckle edge catch

  // ── GUN ARM (front shoulder) ───────────────────────────────────────────────
  // Upper arm — JACKET_M distinct from body for clear separation
  r(ctx, 15, 18,  4,  8, JACKET_M);
  r(ctx, 15, 18,  1,  8, JACKET_D);         // arm shadow side
  r(ctx, 18, 18,  1,  8, JACKET_L);         // arm light side
  // Forearm — same tonal structure, slight narrowing implied by shade
  r(ctx, 16, 26,  3,  5, JACKET_M);
  r(ctx, 16, 26,  1,  5, JACKET_D);
  r(ctx, 18, 26,  1,  5, JACKET_L);         // forearm outer highlight
  // Gloved hand gripping gun
  r(ctx, 18, 25,  3,  4, GLOVE);
  r(ctx, 18, 25,  1,  4, GLOVE_D);
  r(ctx, 20, 25,  1,  2, GLOVE_L);          // knuckle glint

  // ── GUN (pistol) — barrel at y=22, PLAYER_BULLET_Y_STAND = 22 ─────────────
  r(ctx, 20, 21,  3,  1, GUN_HL);           // slide top catch
  r(ctx, 19, 22,  2,  5, GUN_D);            // grip (dark material)
  r(ctx, 21, 22,  1,  1, GUN_HL);           // slide top
  r(ctx, 21, 23,  2,  3, GUN);              // slide body
  r(ctx, 21, 23,  2,  1, GUN_L);            // slide top highlight
  r(ctx, 22, 24,  1,  2, GUN_D);            // slide far edge
  // Barrel (extends to muzzle at x=23)
  r(ctx, 21, 21,  3,  2, GUN);
  r(ctx, 21, 21,  3,  1, GUN_L);            // barrel top highlight
  r(ctx, 22, 22,  2,  1, GUN_D);            // barrel underside
  r(ctx, 23, 22,  1,  1, GUN_DD);           // muzzle

  // ── LEGS — walk animation ──────────────────────────────────────────────────
  const [lyB, lhB, lyF, lhF] = frame === 0
    ? [30, 10, 33,  7]
    : [33,  7, 30, 10];

  // Back leg (thigh + shin, darker — behind body)
  r(ctx,  5, lyB,  4, lhB, PANTS_D);
  r(ctx,  5, lyB,  1, lhB, PANTS_DD);
  r(ctx,  8, lyB,  1, lhB, PANTS);
  // Front leg (thigh + shin, lighter — in front)
  r(ctx, 10, lyF,  4, lhF, PANTS);
  r(ctx, 13, lyF,  1, lhF, PANTS_D);
  r(ctx, 10, lyF,  1, lhF, PANTS_L);

  // ── COAT FLAPS (drawn over legs — long-coat silhouette) ────────────────────
  r(ctx,  3, 30,  4, 12, JACKET_D);         // back flap body
  r(ctx,  3, 30,  1, 12, JACKET_DD);        // back flap shadow
  r(ctx,  6, 30,  1, 12, JACKET);           // back flap front edge (tone break)
  r(ctx, 13, 30,  4, 12, JACKET);           // front flap body
  r(ctx, 16, 30,  1, 12, JACKET_D);         // front flap outer edge
  r(ctx, 13, 30,  1, 12, JACKET_L);         // front flap inner highlight
  r(ctx, 12, 30,  1,  8, JACKET_M);         // gap hint between flaps

  // ── BOOTS ──────────────────────────────────────────────────────────────────
  r(ctx,  3, 40,  7,  3, BOOTS);            // back boot body
  r(ctx,  3, 40,  1,  3, BOOTS_DD);
  r(ctx,  4, 40,  3,  1, BOOTS_L);          // boot top highlight
  r(ctx,  9, 40,  1,  3, BOOTS_D);          // back boot inner edge
  r(ctx,  3, 43,  8,  1, BOOTS_D);          // back boot sole
  r(ctx, 10, 40,  8,  3, BOOTS);            // front boot body
  r(ctx, 17, 40,  1,  3, BOOTS_DD);
  r(ctx, 10, 40,  4,  1, BOOTS_HL);         // toe cap highlight
  r(ctx, 14, 40,  3,  1, BOOTS_L);          // front boot top
  r(ctx, 10, 43,  9,  1, BOOTS_D);          // front boot sole

  ctx.restore();
}

// ── Crouching pose — 24 × 28, side profile ────────────────────────────────────
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // ── HEAD — profile, slightly bowed forward ────────────────────────────────
  r(ctx,  4,  0,  7,  1, HAIR_L);
  r(ctx,  3,  1,  8,  2, HAIR);
  r(ctx,  3,  1,  1,  7, HAIR_DD);
  r(ctx,  4,  3,  3,  4, HAIR_DD);

  r(ctx,  9,  1,  4,  2, SKIN_LL);   // forehead
  r(ctx,  7,  3,  6,  5, SKIN);
  r(ctx,  7,  3,  1,  5, SKIN_D);
  r(ctx,  8,  3,  2,  1, SKIN_L);    // brow

  r(ctx, 10,  4,  2,  1, SKIN_DD);   // brow shadow
  r(ctx, 10,  5,  2,  1, EYE);
  r(ctx, 10,  5,  1,  1, EYE_L);

  r(ctx, 12,  5,  1,  2, SKIN_D);    // nose bridge
  r(ctx, 13,  7,  1,  1, SKIN_DD);   // nose tip

  r(ctx,  7,  7,  5,  2, SKIN);      // jaw
  r(ctx,  7,  7,  1,  2, SKIN_D);
  r(ctx,  9,  8,  2,  1, SKIN_DD);   // chin

  // Neck (compressed in crouch)
  r(ctx,  8,  9,  3,  1, SKIN_D);

  // ── JACKET — hunched, wide shoulder hump ──────────────────────────────────
  r(ctx,  2, 10, 16,  3, JACKET_L);  // hump catch-light surface
  r(ctx,  2, 10,  2,  3, JACKET_DD); // hump back shadow
  r(ctx, 16, 10,  2,  3, JACKET_DD); // hump front shadow
  r(ctx,  4, 10,  4,  1, JACKET_HL); // hump glint
  r(ctx,  5, 10,  2,  1, JACKET_HL); // hot spot

  r(ctx,  3, 13, 13,  5, JACKET);    // body
  r(ctx,  3, 13,  2,  5, JACKET_DD);
  r(ctx,  5, 13,  2,  5, JACKET_D);
  r(ctx, 13, 13,  3,  5, JACKET_D);
  r(ctx, 13, 15,  3,  3, JACKET_DD); // front lower deep shadow
  r(ctx,  7, 13,  4,  2, JACKET_L);  // chest catch-light
  r(ctx,  8, 13,  2,  1, JACKET_HL);

  // Shirt + lapels
  r(ctx, 10, 10,  2,  8, SHIRT);
  r(ctx, 12, 10,  2,  8, JACKET_L);
  r(ctx,  9, 10,  1,  8, JACKET_M);

  // Belt
  r(ctx,  4, 18, 11,  1, BELT);
  r(ctx,  7, 18,  4,  1, BKL);
  r(ctx,  7, 18,  2,  1, BKL_L);

  // ── BACK ARM (mostly hidden, sliver visible) ───────────────────────────────
  r(ctx,  2, 13,  2,  6, JACKET_DD);

  // ── GUN ARM (aimed forward, horizontal) ───────────────────────────────────
  // Upper arm
  r(ctx, 13, 10,  4,  5, JACKET_M);
  r(ctx, 13, 10,  1,  5, JACKET_D);
  r(ctx, 16, 10,  1,  5, JACKET_L);
  // Forearm extends toward gun
  r(ctx, 14, 15,  3,  4, JACKET_M);
  r(ctx, 14, 15,  1,  4, JACKET_D);
  r(ctx, 16, 15,  1,  4, JACKET_L);
  // Gloved hand
  r(ctx, 16, 17,  3,  3, GLOVE);
  r(ctx, 16, 17,  1,  3, GLOVE_D);
  r(ctx, 18, 17,  1,  1, GLOVE_L);

  // ── GUN — barrel at y=14, PLAYER_BULLET_Y_CROUCH = 14 ─────────────────────
  r(ctx, 17, 13,  4,  1, GUN_HL);    // slide top
  r(ctx, 17, 14,  2,  4, GUN_D);     // grip
  r(ctx, 19, 13,  4,  2, GUN);       // barrel
  r(ctx, 19, 13,  4,  1, GUN_L);     // barrel top highlight
  r(ctx, 20, 14,  3,  1, GUN_D);     // barrel underside
  r(ctx, 23, 14,  1,  1, GUN_DD);    // muzzle

  // ── LEGS — bent, visible at sides of body ─────────────────────────────────
  r(ctx,  3, 19,  4,  4, PANTS_D);   // back thigh
  r(ctx,  3, 19,  1,  4, PANTS_DD);
  r(ctx,  5, 19,  1,  4, PANTS);
  r(ctx,  9, 19,  4,  4, PANTS);     // front thigh
  r(ctx, 12, 19,  1,  4, PANTS_D);
  r(ctx,  9, 19,  1,  4, PANTS_L);

  // ── BOOTS — flat squat stance ──────────────────────────────────────────────
  r(ctx,  2, 23,  7,  4, BOOTS);
  r(ctx,  2, 23,  1,  4, BOOTS_DD);
  r(ctx,  3, 23,  3,  1, BOOTS_L);
  r(ctx,  2, 27,  8,  1, BOOTS_D);   // sole
  r(ctx,  9, 23,  7,  4, BOOTS);
  r(ctx, 15, 23,  1,  4, BOOTS_DD);
  r(ctx,  9, 23,  4,  1, BOOTS_HL);
  r(ctx,  9, 27,  8,  1, BOOTS_D);   // sole

  ctx.restore();
}
