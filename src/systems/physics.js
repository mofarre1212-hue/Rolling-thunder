import {
  GRAVITY, PLAYER_MAX_FALL,
  FLOOR_Y_LOWER, FLOOR_Y_UPPER
} from '../constants.js';

// Returns the floor Y that an entity standing at (x, w) should land on,
// given the set of platforms. Returns null if no floor beneath.
function resolveFloor(ex, ew, platforms) {
  let best = null;
  for (const p of platforms) {
    // Only solid-top platforms (entity must be above the top surface)
    if (ex + ew <= p.x || ex >= p.x + p.w) continue;
    const surface = p.y;
    if (best === null || surface < best) best = surface;
  }
  return best;
}

export function applyPhysics(entity, platforms) {
  entity.vy = Math.min((entity.vy || 0) + GRAVITY, PLAYER_MAX_FALL);
  entity.y += entity.vy;

  const h = entity.crouching ? entity.crouchH : entity.h;
  const floorY = resolveFloor(entity.x, entity.w, platforms);

  if (floorY !== null && entity.y + h >= floorY) {
    entity.y = floorY - h;
    entity.vy = 0;
    entity.onGround = true;
    entity.currentFloorY = floorY;
  } else {
    entity.onGround = false;
  }
}
