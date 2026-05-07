# Rolling Thunder Homage — Project Rules

## What This Is
A mechanically faithful browser-based homage to the 1986 Namco arcade game Rolling
Thunder. Tone is serious and arcade-like. No parody, no comedy. All assets and code
are original.

## Tech Stack
- Plain HTML + CSS + JavaScript
- Canvas 2D API only
- ES modules (import/export)
- No frameworks, no libraries, no localStorage
- Target: laptop keyboard, 60 fps, fixed 384×224 internal resolution (2× scaled)

## File Map
    src/main.js          — game loop, top-level state machine
    src/constants.js     — every tunable number lives here, nowhere else
    src/input.js         — key state only; entities query it, never listen to events
    src/camera.js        — world↔screen transform
    src/level/           — stage data and tilemap renderer
    src/entities/        — player, enemy, bullet, door
    src/systems/         — physics, combat, spawner
    src/ui/              — hud, screens

## Coding Rules
1. No number literals in entity or system code — use constants.js.
2. Each file exports exactly what it owns. No cross-cutting god objects.
3. Game state flows: input → entities → systems → render. Never reverse.
4. Physics is deterministic: no Math.random() in movement, only in spawn timing.
5. No comments explaining WHAT the code does. Only comments for non-obvious WHY.
6. No TypeScript, no JSDoc types, no build step.
7. Favor crisp controls over smooth visuals. If it feels laggy, fix constants first.

## Mechanic Reference (v1 scope)
- Lower floor y=160, upper ledge y=96 (world coords)
- Jump: fixed velocity up, gravity constant down, no variable height
- Crouch: halves hitbox height, player cannot be hit by head-height shots
- Pistol: single bullet on screen when ammo=0; refills at bullet doors
- Machine gun: held-fire, limited ammo, arms door only; reverts to pistol at 0
- Doors: Up key to enter when adjacent; player is immune while inside; shoot to exit
- Enemy AI: patrol → alert on sight → position → shoot → repeat
- Two enemy heights: standing (full hitbox) and crouching (low hitbox, shoots low)
- Timer: 90s per stage; death or timeout = game over

## Edit Protocol
Before any edit touching more than 3 files, write a short plan in chat.
After each edit, report:
  1. Files changed
  2. What changed
  3. What to test next

## Non-Goals (v1)
- Sprite art (use placeholder shapes)
- Sound / music
- Multiple stages
- High-score table
- Touch / gamepad input
- Networked multiplayer
