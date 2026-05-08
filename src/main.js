import {
  CANVAS_W, CANVAS_H, SCALE, STAGE_TIME_SECONDS,
  ENEMY_DEATH_FRAMES, ENEMY_SCORE_GRUNT, ENEMY_SCORE_RIFLEMAN,
  PLAYER_MAX_HP,
} from './constants.js';
import { input } from './input.js';
import { camera } from './camera.js';
import { platforms, buildDoors, spawnTriggers, WORLD_W } from './level/stage1.js';
import { drawLevel } from './level/tilemap.js';
import { createPlayer } from './entities/player.js';
import { resolveCombat } from './systems/combat.js';
import { runSpawner } from './systems/spawner.js';
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
let player, doors, bullets, enemies, score, timeLeft, deathTimer;

// Full new-game reset (title → play)
function initGame() {
  score = 0;
  _resetLevel(PLAYER_MAX_HP);
}

// Restart the level while preserving remaining lives and score.
// Called automatically after the death pause expires.
function _resetLevel(livesRemaining) {
  const savedHp = livesRemaining;
  player    = createPlayer();
  player.hp = savedHp;        // carry lives forward
  doors     = buildDoors();
  bullets   = [];
  enemies   = [];
  timeLeft  = STAGE_TIME_SECONDS;
  deathTimer = 0;

  for (const t of spawnTriggers) t.fired = false;

  camera.init(WORLD_W);
  state = 'play';
}

// ── Rendering helpers ─────────────────────────────────────────────────────────
function drawBullets() {
  for (const b of bullets) {
    ctx.fillStyle = b.owner === 'player' ? '#ffff66' : '#ff5522';
    ctx.fillRect(camera.toScreenX(b.x), b.y, b.w, b.h);
    ctx.fillStyle = b.owner === 'player' ? '#ffffff' : '#ffaa44';
    ctx.fillRect(camera.toScreenX(b.x) + 1, b.y + 1, b.w - 2, 1);
  }
}

// ── Main loop ─────────────────────────────────────────────────────────────────
let lastTime = 0;
const FRAME  = 1000 / 60;

function loop(ts) {
  requestAnimationFrame(loop);
  const dt = ts - lastTime;
  if (dt < FRAME - 1) return;
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

  if (state === 'dead') {
    if (input.pressed('KeyZ')) initGame();
    return;
  }

  if (state === 'clear') {
    if (input.pressed('KeyZ')) state = 'title';
    return;
  }

  // ── Play ────────────────────────────────────────────────────────────────────
  timeLeft -= 1 / 60;

  // Death pause — freeze gameplay, count down, then respawn or game-over
  if (player.dead) {
    deathTimer++;
    if (deathTimer >= 90) {           // ~1.5 s pause
      if (player.hp <= 0) {
        state = 'dead';               // no lives left → game over
      } else {
        _resetLevel(player.hp);       // lives remain → restart level
      }
    }
    return; // no further updates while player is dead
  }

  // Spawn waves
  runSpawner(camera, spawnTriggers, enemies);

  // Update entities
  player.update(platforms, doors, bullets);
  for (const e of enemies) e.update(player, platforms, bullets);

  // Move bullets, cull off-world
  for (const b of bullets) {
    b.x += b.vx;
    if (b.x < 0 || b.x > WORLD_W) b.dead = true;
  }

  // Hit detection
  resolveCombat(bullets, enemies, player);

  // Prune dead bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].dead) bullets.splice(i, 1);
  }

  // Score newly-dead enemies; prune after death animation
  for (const e of enemies) {
    if (e.dead && !e.scored) {
      score += e.type === 'grunt' ? ENEMY_SCORE_GRUNT : ENEMY_SCORE_RIFLEMAN;
      e.scored = true;
    }
  }
  for (let i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].dead && enemies[i].deathTimer > ENEMY_DEATH_FRAMES) {
      enemies.splice(i, 1);
    }
  }

  camera.follow(player);

  if (timeLeft <= 0)            state = 'dead';
  if (player.x > WORLD_W - 60) state = 'clear';
}

function render() {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  if (state === 'title') {
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    drawTitle(ctx);
    return;
  }

  drawLevel(ctx, platforms, doors);
  for (const e of enemies) e.draw(ctx, camera.x);
  drawBullets();
  player.draw(ctx, camera.x);
  drawHUD(ctx, player, score, timeLeft);

  if (state === 'dead')  drawGameOver(ctx, score);
  if (state === 'clear') drawStageClear(ctx, score);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
state = 'title';
requestAnimationFrame(loop);
