import { PLAYER_W } from '../constants.js';

// Palette — Rolling Thunder protagonist style
const HAIR     = '#2a1a08';
const SKIN     = '#d4a870';
const SKIN_D   = '#b08050';
const EYE      = '#160800';
const SHIRT    = '#e8e8d8'; // white undershirt visible at collar
const JACKET   = '#cc2020'; // bright red jacket
const JACKET_D = '#8a1010'; // jacket shadow
const JACKET_L = '#e03838'; // jacket highlight
const PANTS    = '#585868'; // gray slacks
const PANTS_D  = '#383848';
const BELT     = '#1a1008';
const SHOES    = '#cc2020'; // red shoes, matching jacket
const GUN      = '#787878';
const GUN_D    = '#444448';

function r(ctx, x, y, w, h, col) {
  ctx.fillStyle = col;
  ctx.fillRect(x, y, w, h);
}

// Sets up transform so art is always drawn facing right;
// scale(-1,1) handles the mirror for left-facing.
function beginSprite(ctx, bx, by, facing) {
  ctx.save();
  ctx.translate(Math.round(bx), Math.round(by));
  if (facing === -1) {
    ctx.translate(PLAYER_W, 0);
    ctx.scale(-1, 1);
  }
}

// Standing pose — 12 × 24
export function drawPlayerStand(ctx, bx, by, facing, frame) {
  beginSprite(ctx, bx, by, facing);

  // Hair (short, dark — no hat)
  r(ctx, 2, 0, 7, 2, HAIR);
  r(ctx, 1, 2, 8, 1, HAIR);

  // Face
  r(ctx, 3, 3, 6, 1, SKIN);     // forehead
  r(ctx, 2, 4, 8, 3, SKIN);     // main face
  r(ctx, 4, 5, 1, 1, EYE);
  r(ctx, 7, 5, 1, 1, EYE);
  r(ctx, 3, 6, 1, 1, SKIN_D);   // cheek shadow
  r(ctx, 4, 7, 4, 1, SKIN_D);   // chin

  // Neck
  r(ctx, 5, 7, 2, 1, SKIN);

  // White shirt collar (visible at jacket opening)
  r(ctx, 4, 8, 4, 2, SHIRT);

  // Red jacket body
  r(ctx, 1, 9, 9, 8, JACKET);
  r(ctx, 1, 9, 1, 8, JACKET_D); // left edge shadow
  r(ctx, 9, 9, 1, 8, JACKET_D); // right edge shadow
  r(ctx, 3, 9, 5, 2, JACKET_L); // chest highlight

  // Belt
  r(ctx, 2, 17, 8, 1, BELT);

  // Gray slacks — walk cycle: legs alternate 1px up/down
  const lyL = frame === 0 ? 18 : 19;
  const lyR = frame === 0 ? 19 : 18;
  const lhL = frame === 0 ?  5 :  4;
  const lhR = frame === 0 ?  4 :  5;
  r(ctx,  2, lyL, 4, lhL, PANTS);
  r(ctx,  2, lyL, 1, lhL, PANTS_D); // inner-leg shadow
  r(ctx,  7, lyR, 4, lhR, PANTS);
  r(ctx, 10, lyR, 1, lhR, PANTS_D);

  // Red shoes
  r(ctx, 1, 23, 5, 1, SHOES);
  r(ctx, 7, 23, 4, 1, SHOES);

  // Gun arm (extends right — mirrored for left-facing)
  r(ctx, 10, 12, 2, 3, JACKET);  // sleeve
  r(ctx, 12, 13, 3, 1, GUN);    // barrel
  r(ctx, 12, 14, 2, 1, GUN_D);  // barrel underside

  ctx.restore();
}

// Crouching pose — 12 × 14
export function drawPlayerCrouch(ctx, bx, by, facing) {
  beginSprite(ctx, bx, by, facing);

  // Hair
  r(ctx, 2, 0, 7, 1, HAIR);
  r(ctx, 1, 1, 9, 1, HAIR);

  // Face (head tilted forward)
  r(ctx, 2, 2, 7, 3, SKIN);
  r(ctx, 4, 3, 1, 1, EYE);
  r(ctx, 6, 3, 1, 1, EYE);
  r(ctx, 3, 4, 1, 1, SKIN_D);   // cheek shadow

  // Red jacket (hunched — wider, shorter)
  r(ctx, 1, 5, 10, 6, JACKET);
  r(ctx, 1, 5, 1,  6, JACKET_D); // left shadow
  r(ctx, 3, 5, 5,  2, JACKET_L); // chest highlight
  r(ctx, 9, 5, 2,  6, JACKET_D); // right shadow

  // White collar on top of jacket
  r(ctx, 4, 5, 3, 1, SHIRT);

  // Gray pants (bent at knee)
  r(ctx,  1, 11, 4, 2, PANTS);
  r(ctx,  1, 11, 1, 2, PANTS_D);
  r(ctx,  7, 11, 4, 2, PANTS);
  r(ctx, 10, 11, 1, 2, PANTS_D);

  // Red shoes (wider, flat on ground)
  r(ctx,  0, 13, 5, 1, SHOES);
  r(ctx,  6, 13, 5, 1, SHOES);

  // Gun arm (lowered, forward — crouch-shoot stance)
  r(ctx,  9, 7, 2, 3, JACKET);
  r(ctx, 11, 8, 3, 1, GUN);
  r(ctx, 11, 9, 2, 1, GUN_D);

  ctx.restore();
}
