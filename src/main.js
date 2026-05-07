import { CANVAS_W, CANVAS_H, SCALE, STAGE_TIME_SECONDS } from './constants.js';
import { input } from './input.js';
import { camera } from './camera.js';
import { platforms, buildDoors, spawnTriggers, WORLD_W } from './level/stage1.js';
import { drawLevel } from './level/tilemap.js';
import { createPlayer } from './entities/player.js';
import { drawHUD } from './ui/hud.js';
import { drawTitle, drawGameOver, drawStageClear } from './ui/screens.js';

// ── Canvas setup ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('game');
const ctx    = canvas.getContext('2d');
canvas.width  = CANVAS_W;
canvas.height = CANVAS_H;
canvas.style.width  = `${CANVAS_W * SCALE}px`;
canvas.style.height = `${CANVAS_H * SCALE}px`;
ctx.imageSmoothingEnabled = false;

// ── Game state ────────────────────────────────────────────────────────────────
let state;   // 'title' | 'play' | 'dead' | 'clear'
let player, doors, bullets, score, timeLeft;

function initGame() {
  player    = createPlayer();
  doors     = buildDoors();
  bullets   = [];
  score     = 0;
  timeLeft  = STAGE_TIME_SECONDS;

  // Reset spawn triggers
  for (const t of spawnTriggers) t.fired = false;

  camera.init(WORLD_W);
  state = 'play';
}

// ── Bullet drawing (minimal, here until combat system added) ──────────────────
function drawBullets(ctx) {
  for (const b of bullets) {
    ctx.fillStyle = b.owner === 'player' ? '#ffff88' : '#ff6644';
    ctx.fillRect(camera.toScreenX(b.x), b.y, b.w, b.h);
  }
}

function updateBullets() {
  for (const b of bullets) {
    b.x += b.vx;
    // Kill bullets that leave the world
    if (b.x < 0 || b.x > WORLD_W) b.dead = true;
  }
  // Prune dead bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].dead) bullets.splice(i, 1);
  }
}

// ── Main loop ─────────────────────────────────────────────────────────────────
let lastTime = 0;
const FRAME = 1000 / 60;

function loop(ts) {
  requestAnimationFrame(loop);

  const dt = ts - lastTime;
  if (dt < FRAME - 1) return; // cap to ~60 fps
  lastTime = ts;

  update();
  render();
  input.flush();
}

function update() {
  if (state === 'title') {
    if (input.pressed('KeyZ')) initGame();
    return;
  }

  if (state === 'dead' || state === 'clear') {
    if (input.pressed('KeyZ')) {
      state = 'title';
    }
    return;
  }

  // Play state
  timeLeft -= 1 / 60;

  player.update(platforms, doors, bullets);
  updateBullets();
  camera.follow(player);

  if (player.dead || timeLeft <= 0) state = 'dead';

  // Stage clear: player reaches near end of world
  if (player.x > WORLD_W - 60) state = 'clear';
}

function render() {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  if (state === 'title') {
    // Draw minimal background behind title
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    drawTitle(ctx);
    return;
  }

  drawLevel(ctx, platforms, doors);
  drawBullets(ctx);
  player.draw(ctx, camera.x);
  drawHUD(ctx, player, score, timeLeft);

  if (state === 'dead')  drawGameOver(ctx, score);
  if (state === 'clear') drawStageClear(ctx, score);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
state = 'title';
requestAnimationFrame(loop);
