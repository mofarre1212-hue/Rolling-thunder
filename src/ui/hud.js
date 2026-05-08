import {
  CANVAS_W, CANVAS_H,
  PLAYER_MAX_HP, PISTOL_AMMO_MAX, MACHINEGUN_AMMO_MAX,
  COL_HUD_BG, COL_HUD_TEXT, COL_HP_FULL, COL_HP_EMPTY,
} from '../constants.js';

const HH      = 20;
const GOLD    = '#d4a820';
const WHITE   = '#e8eef0';
const DIM     = '#607080';
const RED     = '#cc2020';
const ORANGE  = '#d06010';
const GREEN   = '#28a840';

export function drawHUD(ctx, player, score, timeLeft) {
  // Top bar
  ctx.fillStyle = COL_HUD_BG;
  ctx.fillRect(0, 0, CANVAS_W, HH);
  // Subtle bottom highlight line
  ctx.fillStyle = '#1a2c40';
  ctx.fillRect(0, HH - 1, CANVAS_W, 1);

  ctx.textBaseline = 'middle';

  // ── Lives (left) ────────────────────────────────────────────────────────────
  ctx.fillStyle = DIM;
  ctx.font = '6px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('MAN', 5, HH / 2);

  for (let i = 0; i < PLAYER_MAX_HP; i++) {
    const active = i < player.hp;
    const px = 24 + i * 13;
    // Pip background
    ctx.fillStyle = active ? '#3a0808' : '#1a1414';
    ctx.fillRect(px, 5, 10, 10);
    // Pip fill
    ctx.fillStyle = active ? COL_HP_FULL : COL_HP_EMPTY;
    ctx.fillRect(px + 1, 6, 8, 8);
    // Glint on active pip
    if (active) {
      ctx.fillStyle = '#ff6060';
      ctx.fillRect(px + 1, 6, 4, 1);
    }
  }

  // ── Score (center) ──────────────────────────────────────────────────────────
  ctx.fillStyle = DIM;
  ctx.font = '6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SCORE', CANVAS_W / 2, 5);

  ctx.fillStyle = GOLD;
  ctx.font = '8px monospace';
  ctx.fillText(`${score}`.padStart(6, '0'), CANVAS_W / 2, 14);

  // ── Timer (right) ──────────────────────────────────────────────────────────
  const t = Math.max(0, Math.ceil(timeLeft));
  ctx.fillStyle = DIM;
  ctx.font = '6px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('TIME', CANVAS_W - 5, 5);

  ctx.fillStyle = t <= 10 ? RED : WHITE;
  ctx.font = '8px monospace';
  ctx.fillText(`${String(t).padStart(2, '0')}`, CANVAS_W - 5, 14);

  // ── Bottom weapon bar ───────────────────────────────────────────────────────
  const BY = CANVAS_H - 16;
  ctx.fillStyle = COL_HUD_BG;
  ctx.fillRect(0, BY, CANVAS_W, 16);
  ctx.fillStyle = '#1a2c40';
  ctx.fillRect(0, BY, CANVAS_W, 1); // top line

  ctx.textBaseline = 'middle';
  const my = BY + 8;

  if (player.weapon === 'machinegun') {
    // Weapon label
    ctx.fillStyle = ORANGE;
    ctx.font = '7px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('M/GUN', 5, my);

    // Ammo count
    ctx.fillStyle = WHITE;
    ctx.fillText(`${player.machinegunAmmo}`, 45, my);

    // Fill bar
    const barW = Math.round((player.machinegunAmmo / MACHINEGUN_AMMO_MAX) * 88);
    ctx.fillStyle = '#2a1a08';
    ctx.fillRect(60, BY + 4, 88, 8);
    ctx.fillStyle = ORANGE;
    ctx.fillRect(60, BY + 5, barW, 6);
    ctx.fillStyle = '#ff9030';
    ctx.fillRect(60, BY + 5, barW, 2); // highlight
    ctx.strokeStyle = '#3a3028';
    ctx.strokeRect(60, BY + 4, 88, 8);

  } else {
    // Weapon label
    const empty = player.pistolAmmo === 0;
    ctx.fillStyle = empty ? RED : '#c8c040';
    ctx.font = '7px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('PISTOL', 5, my);

    if (empty) {
      ctx.fillStyle = RED;
      ctx.fillText('EMPTY', 55, my);
    } else {
      // Ammo count
      ctx.fillStyle = WHITE;
      ctx.fillText(`${player.pistolAmmo}`, 55, my);

      const barW = Math.round((player.pistolAmmo / PISTOL_AMMO_MAX) * 80);
      ctx.fillStyle = '#1a1a0a';
      ctx.fillRect(72, BY + 4, 80, 8);
      ctx.fillStyle = '#c8c040';
      ctx.fillRect(72, BY + 5, barW, 6);
      ctx.fillStyle = '#e8e060';
      ctx.fillRect(72, BY + 5, barW, 2); // highlight
      ctx.strokeStyle = '#303028';
      ctx.strokeRect(72, BY + 4, 80, 8);
    }
  }

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
