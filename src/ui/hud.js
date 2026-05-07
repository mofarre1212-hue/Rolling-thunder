import {
  CANVAS_W, CANVAS_H,
  PLAYER_MAX_HP, PISTOL_AMMO_MAX, MACHINEGUN_AMMO_MAX,
  COL_HUD_BG, COL_HUD_TEXT, COL_HP_FULL, COL_HP_EMPTY,
  STAGE_TIME_SECONDS
} from '../constants.js';

export function drawHUD(ctx, player, score, timeLeft) {
  const HH = 20;

  // Top bar background
  ctx.fillStyle = COL_HUD_BG;
  ctx.fillRect(0, 0, CANVAS_W, HH);

  ctx.font = '8px monospace';
  ctx.textBaseline = 'middle';

  // Health pips
  for (let i = 0; i < PLAYER_MAX_HP; i++) {
    ctx.fillStyle = i < player.hp ? COL_HP_FULL : COL_HP_EMPTY;
    ctx.fillRect(6 + i * 10, 6, 8, 8);
  }

  // Score
  ctx.fillStyle = COL_HUD_TEXT;
  ctx.textAlign = 'center';
  ctx.fillText(`${score}`.padStart(6, '0'), CANVAS_W / 2, HH / 2);

  // Timer
  const t = Math.max(0, Math.ceil(timeLeft));
  ctx.textAlign = 'right';
  ctx.fillStyle = t <= 10 ? '#ff4444' : COL_HUD_TEXT;
  ctx.fillText(`${t}`, CANVAS_W - 6, HH / 2);

  // Weapon / ammo bar — bottom strip
  ctx.fillStyle = COL_HUD_BG;
  ctx.fillRect(0, CANVAS_H - 14, CANVAS_W, 14);

  ctx.textAlign = 'left';
  ctx.fillStyle = COL_HUD_TEXT;

  if (player.weapon === 'machinegun') {
    ctx.fillText('MG', 6, CANVAS_H - 7);
    const barW = Math.round((player.machinegunAmmo / MACHINEGUN_AMMO_MAX) * 80);
    ctx.fillStyle = '#ff8800';
    ctx.fillRect(22, CANVAS_H - 11, barW, 6);
    ctx.strokeStyle = '#555';
    ctx.strokeRect(22, CANVAS_H - 11, 80, 6);
  } else {
    ctx.fillText('GUN', 6, CANVAS_H - 7);
    if (player.pistolAmmo === 0) {
      ctx.fillStyle = '#ff4444';
      ctx.fillText('EMPTY', 28, CANVAS_H - 7);
    } else {
      const barW = Math.round((player.pistolAmmo / PISTOL_AMMO_MAX) * 60);
      ctx.fillStyle = '#ffff88';
      ctx.fillRect(28, CANVAS_H - 11, barW, 6);
      ctx.strokeStyle = '#555';
      ctx.strokeRect(28, CANVAS_H - 11, 60, 6);
    }
  }

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}
