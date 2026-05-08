function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}

function hitbox(entity) {
  const h = entity.crouching ? entity.crouchH : entity.h;
  return { x: entity.x, y: entity.y, w: entity.w, h };
}

export function resolveCombat(bullets, enemies, player) {
  for (const b of bullets) {
    if (b.dead) continue;

    if (b.owner === 'player') {
      for (const e of enemies) {
        if (e.dead) continue;
        if (overlaps(b, hitbox(e))) {
          b.dead = true;
          e.takeDamage();
          break;
        }
      }
    } else {
      // Enemy bullet — player is immune while in a door
      if (!player.dead && !player.inDoor && overlaps(b, hitbox(player))) {
        b.dead = true;
        player.takeDamage();
      }
    }
  }
}
