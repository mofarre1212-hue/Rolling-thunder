import { GRAVITY, PLAYER_MAX_FALL } from '../constants.js';

export function applyPhysics(entity, platforms) {
  entity.vy = Math.min((entity.vy || 0) + GRAVITY, PLAYER_MAX_FALL);

  const h = entity.crouching ? entity.crouchH : entity.h;
  // Bottom of entity before this frame's vertical movement
  const prevBottom = entity.y + h;

  entity.y += entity.vy;

  let landedSurface = null;
  for (const p of platforms) {
    // Horizontal overlap check
    if (entity.x + entity.w <= p.x || entity.x >= p.x + p.w) continue;

    const surface = p.y;

    // One-way: only land on a surface if the entity's bottom was at or above
    // it before this frame. Prevents walking under a ledge from snapping up.
    if (prevBottom > surface + 1) continue;

    // Did the entity cross (or reach) the surface this frame?
    if (entity.y + h >= surface) {
      if (landedSurface === null || surface < landedSurface) {
        landedSurface = surface;
      }
    }
  }

  if (landedSurface !== null) {
    entity.y = landedSurface - h;
    entity.vy = 0;
    entity.onGround = true;
    entity.currentFloorY = landedSurface;
  } else {
    entity.onGround = false;
  }
}
