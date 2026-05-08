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
const PANTS_HL = '#7a7c94';

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

// ── Standing pose — 20 × 40, side-profile right-facing ────────────────────────
// Head is ~9px wide with face features on the right (front-facing) side only.
// Body is wider than head to avoid the chibi/bobblehead proportion.
export function drawPlayerStand(ctx, bx, by, facing, frame) {
  beginSprite(ctx, bx, by, facing);

  // ── HEAD: side profile (face points right) ────────────────────────────────
  // Hair — back/top mass only, NO left-right symmetry
  r(ctx,  4,  0,  7,  1, HAIR_L);   // crown highlight
  r(ctx,  3,  1,  8,  2, HAIR);     // crown mass
  r(ctx,  3,  1,  1,  4, HAIR_DD);  // back-of-head deep shadow
  r(ctx,  3,  3,  4,  3, HAIR_DD);  // nape/lower hair (back half only)

  // Forehead (visible just above eye line, rightward)
  r(ctx,  9,  2,  4,  1, SKIN_LL);  // forehead highlight

  // Face block (right portion of head — profile orientation)
  r(ctx,  7,  3,  6,  5, SKIN);     // face main
  r(ctx,  7,  3,  1,  5, SKIN_D);   // receding-cheek shadow
  r(ctx,  8,  3,  2,  1, SKIN_LL);  // brow ridge

  // Single eye (right/front of face only — NOT symmetric)
  r(ctx,  9,  5,  2,  1, EYE);
  r(ctx,  9,  5,  1,  1, EYE_L);    // eye glint

  // Nose in profile (bump at rightmost face edge)
  r(ctx, 12,  5,  1,  2, SKIN_D);   // nose bridge shadow
  r(ctx, 13,  6,  1,  1, SKIN_DD);  // nose tip

  // Jaw/chin taper
  r(ctx,  7,  7,  5,  2, SKIN);     // jaw
  r(ctx,  7,  7,  1,  2, SKIN_D);   // jaw back shadow
  r(ctx,  9,  9,  2,  1, SKIN_DD);  // chin

  // Neck (narrow — side view)
  r(ctx,  8, 10,  3,  2, SKIN_D);

  // ── JACKET ────────────────────────────────────────────────────────────────
  // Collar visible
  r(ctx,  8, 12,  5,  2, SHIRT);
  r(ctx,  8, 12,  1,  2, SHIRT_D);  // collar back shadow

  // Back shoulder (behind — darker)
  r(ctx,  2, 13,  7,  3, JACKET_D);
  r(ctx,  2, 13,  1,  3, JACKET_DD);

  // Front shoulder (ahead — brighter)
  r(ctx, 11, 13,  7,  3, JACKET_L);
  r(ctx, 17, 13,  1,  3, JACKET_DD);
  r(ctx, 11, 13,  3,  1, JACKET_HL); // shoulder glint

  // Jacket body — back side darker, front side lighter for 3D depth
  r(ctx,  3, 16, 13,  9, JACKET);
  r(ctx,  3, 16,  2,  9, JACKET_DD); // back deep shadow
  r(ctx,  5, 16,  2,  9, JACKET_D);
  r(ctx, 14, 16,  2,  9, JACKET_D);
  r(ctx, 14, 22,  2,  3, JACKET_DD); // lower front shadow
  r(ctx,  7, 16,  5,  3, JACKET_L);  // chest catch-light
  r(ctx,  8, 16,  3,  1, JACKET_HL); // chest hot spot
  r(ctx,  4, 21,  3,  4, JACKET_M);  // back body panel
  r(ctx, 12, 21,  2,  4, JACKET_M);  // front body panel

  // Shirt + lapel (V-neck opening — side view stripe)
  r(ctx, 10, 12,  2, 12, SHIRT);     // shirt showing in opening
  r(ctx, 12, 12,  2, 12, JACKET_L);  // lapel front face
  r(ctx,  9, 12,  1, 12, JACKET_M);  // inner lapel edge

  // Belt
  r(ctx,  3, 25, 12,  2, BELT);
  r(ctx,  3, 25,  4,  1, BELT_L);
  r(ctx,  7, 25,  4,  2, BKL);
  r(ctx,  7, 25,  2,  1, BKL_L);

  // ── LEGS — clearly offset for side-view stride ────────────────────────────
  const [lyL, lhL, lyR, lhR] = frame === 0
    ? [29, 9, 32, 6]
    : [32, 6, 29, 9];
  // Back leg (darker, behind the body)
  r(ctx,  6, lyL,  4, lhL, PANTS_D);
  r(ctx,  6, lyL,  1, lhL, PANTS_DD);
  r(ctx,  9, lyL,  1, lhL, PANTS);
  // Front leg (lighter, ahead of the body)
  r(ctx, 10, lyR,  4, lhR, PANTS);
  r(ctx, 13, lyR,  1, lhR, PANTS_D);
  r(ctx, 10, lyR,  1, lhR, PANTS_L);

  // ── COAT FLAPS — drawn over legs (long-coat silhouette) ───────────────────
  r(ctx,  3, 27,  4, 12, JACKET_D);  // back flap
  r(ctx,  3, 27,  1, 12, JACKET_DD);
  r(ctx,  6, 27,  1, 12, JACKET);    // back flap front edge
  r(ctx, 12, 27,  4, 12, JACKET);    // front flap
  r(ctx, 15, 27,  1, 12, JACKET_D);
  r(ctx, 12, 27,  1, 12, JACKET_L);  // front flap highlight

  // ── BOOTS ─────────────────────────────────────────────────────────────────
  r(ctx,  4, 37,  7,  3, BOOTS);     // back boot
  r(ctx,  4, 37,  1,  3, BOOTS_DD);
  r(ctx,  5, 37,  2,  1, BOOTS_L);
  r(ctx,  4, 39,  8,  1, BOOTS_D);
  r(ctx, 10, 37,  7,  3, BOOTS);     // front boot
  r(ctx, 16, 37,  1,  3, BOOTS_DD);
  r(ctx, 10, 37,  3,  1, BOOTS_HL);
  r(ctx, 10, 39,  8,  1, BOOTS_D);

  // ── BACK ARM — barely visible at left edge, clearly separate from body ─────
  r(ctx,  2, 17,  3,  8, JACKET_D);
  r(ctx,  2, 17,  1,  8, JACKET_DD);

  // ── GUN ARM — protrudes from front shoulder, distinct from jacket body ─────
  r(ctx, 13, 17,  4,  7, JACKET_M);  // arm (JACKET_M ≠ JACKET for visual separation)
  r(ctx, 13, 17,  1,  7, JACKET_D);
  // Gun
  r(ctx, 17, 17,  4,  1, GUN_HL);   // receiver top
  r(ctx, 17, 18,  8,  2, GUN);      // barrel
  r(ctx, 17, 18,  4,  1, GUN_L);    // barrel top highlight
  r(ctx, 18, 19,  6,  1, GUN_D);    // barrel underside
  r(ctx, 16, 17,  2,  3, GUN_D);    // receiver body
  r(ctx, 22, 20,  2,  1, GUN_DD);   // muzzle

  ctx.restore();
}

// ── Crouching pose — 20 × 26, side profile ────────────────────────────────────
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // HEAD — same profile logic, slightly bowed
  r(ctx,  4,  0,  7,  1, HAIR_L);
  r(ctx,  3,  1,  7,  2, HAIR);
  r(ctx,  3,  1,  1,  3, HAIR_DD);
  r(ctx,  3,  3,  3,  2, HAIR_DD);
  r(ctx,  8,  2,  3,  1, SKIN_LL);
  r(ctx,  7,  3,  5,  4, SKIN);
  r(ctx,  7,  3,  1,  4, SKIN_D);
  r(ctx,  8,  3,  2,  1, SKIN_LL);   // brow
  r(ctx,  9,  4,  2,  1, EYE);       // single eye
  r(ctx,  9,  4,  1,  1, EYE_L);
  r(ctx, 11,  5,  1,  1, SKIN_DD);   // nose tip
  r(ctx,  7,  6,  3,  1, SKIN_D);    // jaw shadow
  r(ctx,  7,  7,  2,  1, SKIN_DD);   // chin

  // NECK
  r(ctx,  8,  8,  3,  1, SKIN_D);

  // JACKET — hunched, wider shoulder hump
  r(ctx,  2, 10, 14,  3, JACKET_L);  // shoulder hump
  r(ctx,  2, 10,  2,  3, JACKET_DD);
  r(ctx, 14, 10,  2,  3, JACKET_DD);
  r(ctx,  4, 10,  3,  1, JACKET_HL); // hump glint

  r(ctx,  3, 13, 11,  5, JACKET);
  r(ctx,  3, 13,  2,  5, JACKET_DD);
  r(ctx,  5, 13,  2,  5, JACKET_D);
  r(ctx, 12, 13,  2,  5, JACKET_D);
  r(ctx, 12, 16,  2,  2, JACKET_DD);
  r(ctx,  6, 13,  4,  2, JACKET_L);
  r(ctx,  7, 13,  2,  1, JACKET_HL);

  r(ctx, 10, 10,  2,  7, SHIRT);     // shirt opening
  r(ctx, 12, 10,  2,  7, JACKET_L);  // lapel
  r(ctx,  9, 10,  1,  7, JACKET_M);  // inner lapel edge

  r(ctx,  3, 18, 10,  1, BELT);
  r(ctx,  6, 18,  3,  1, BKL);

  // LEGS — bent, clearly offset (back leg at x=3-6, front at x=9-12)
  r(ctx,  3, 19,  4,  4, PANTS_D);   // back leg
  r(ctx,  3, 19,  1,  4, PANTS_DD);
  r(ctx,  5, 19,  1,  4, PANTS);
  r(ctx,  9, 19,  4,  4, PANTS);     // front leg
  r(ctx, 12, 19,  1,  4, PANTS_D);
  r(ctx,  9, 19,  1,  4, PANTS_L);

  // BOOTS — flat squat
  r(ctx,  2, 22,  6,  3, BOOTS);
  r(ctx,  2, 22,  1,  3, BOOTS_DD);
  r(ctx,  3, 22,  2,  1, BOOTS_L);
  r(ctx,  2, 24,  7,  1, BOOTS_D);
  r(ctx,  9, 22,  6,  3, BOOTS);
  r(ctx, 14, 22,  1,  3, BOOTS_DD);
  r(ctx,  9, 22,  3,  1, BOOTS_HL);
  r(ctx,  9, 24,  7,  1, BOOTS_D);

  // BACK ARM
  r(ctx,  2, 13,  2,  6, JACKET_DD);

  // GUN ARM (aimed flat)
  r(ctx, 12, 13,  3,  5, JACKET_M);
  r(ctx, 12, 13,  1,  5, JACKET_D);
  r(ctx, 15, 12,  4,  1, GUN_HL);
  r(ctx, 15, 13,  7,  2, GUN);
  r(ctx, 15, 13,  3,  1, GUN_L);
  r(ctx, 16, 14,  5,  1, GUN_D);

  ctx.restore();
}
