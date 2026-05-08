import { CANVAS_W, ENEMY_MAX_ACTIVE } from '../constants.js';
import { createEnemy } from '../entities/enemy.js';

export function runSpawner(camera, triggers, enemies) {
  for (const t of triggers) {
    if (t.fired) continue;
    // Fire when the trigger x scrolls into the visible right edge
    if (camera.x + CANVAS_W < t.x) continue;

    t.fired = true;
    for (const s of t.spawns) {
      const active = enemies.filter(e => !e.dead).length;
      if (active >= ENEMY_MAX_ACTIVE) break;
      enemies.push(createEnemy(s.x, s.floorY, s.facing, s.type, s.crouch));
    }
  }
}
