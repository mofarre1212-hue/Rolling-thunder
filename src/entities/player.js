import {
  PLAYER_W, PLAYER_H, PLAYER_CROUCH_H,
  PLAYER_WALK_SPD, PLAYER_JUMP_VY,
  PLAYER_MAX_HP, PLAYER_INVULN_FRAMES,
  PISTOL_AMMO_MAX, MACHINEGUN_AMMO_MAX,
  PISTOL_BULLET_SPD, MACHINEGUN_BULLET_SPD,
  MACHINEGUN_FIRE_RATE, PISTOL_AMMO_EMPTY_COOLDOWN,
  FLOOR_Y_LOWER,
  PLAYER_BULLET_Y_STAND, PLAYER_BULLET_Y_CROUCH,
  BULLET_W, BULLET_H,
  DOOR_W, DOOR_H, DOOR_INTERACT_DIST
} from '../constants.js';
import { input } from '../input.js';
import { applyPhysics } from '../systems/physics.js';
import { drawPlayerStand, drawPlayerCrouch } from '../sprites/playerSprite.js';

// Frames between each walk-cycle toggle
const WALK_FRAME_INTERVAL = 8;

export function createPlayer() {
  return {
    x: 24,
    y: FLOOR_Y_LOWER - PLAYER_H,
    w: PLAYER_W,
    h: PLAYER_H,
    crouchH: PLAYER_CROUCH_H,
    vx: 0,
    vy: 0,
    facing: 1,
    crouching: false,
    onGround: true,
    currentFloorY: FLOOR_Y_LOWER,
    hp: PLAYER_MAX_HP,
    invuln: 0,
    dead: false,

    walkFrame: 0,
    walkTimer: 0,

    weapon: 'pistol',
    pistolAmmo: PISTOL_AMMO_MAX,
    machinegunAmmo: 0,
    fireCooldown: 0,
    emptyFireCooldown: 0,

    inDoor: false,
    doorRef: null,

    update(platforms, doors, bullets) {
      if (this.dead) return;
      if (this.inDoor) {
        this._updateInDoor(bullets);
        return;
      }

      this._handleMovement(platforms);
      this._handleShooting(bullets);

      if (this.invuln > 0) this.invuln--;
      if (this.fireCooldown > 0) this.fireCooldown--;
      if (this.emptyFireCooldown > 0) this.emptyFireCooldown--;

      this._handleDoorEnter(doors);
    },

    _handleMovement(platforms) {
      const left  = input.held('ArrowLeft');
      const right = input.held('ArrowRight');
      const down  = input.held('ArrowDown');
      const jump  = input.pressed('KeyZ') || input.pressed('Space');

      const wasCrouching = this.crouching;
      this.crouching = down && this.onGround;

      // When crouch state changes while grounded, snap y so the bottom stays
      // flush with the floor. Without this, the smaller hitbox floats above the
      // surface for several frames until gravity catches up.
      if (wasCrouching !== this.crouching && this.onGround) {
        const newH = this.crouching ? this.crouchH : this.h;
        this.y = this.currentFloorY - newH;
      }

      if (!this.crouching) {
        if (left)  { this.x -= PLAYER_WALK_SPD; this.facing = -1; }
        if (right) { this.x += PLAYER_WALK_SPD; this.facing = 1;  }
      }
      this.x = Math.max(0, this.x);

      // Walk animation
      const moving = (left || right) && this.onGround && !this.crouching;
      if (moving) {
        this.walkTimer++;
        if (this.walkTimer >= WALK_FRAME_INTERVAL) {
          this.walkTimer = 0;
          this.walkFrame = 1 - this.walkFrame;
        }
      } else {
        this.walkTimer = 0;
      }

      if (jump && this.onGround && !this.crouching) {
        this.vy = PLAYER_JUMP_VY;
        this.onGround = false;
      }

      applyPhysics(this, platforms);
    },

    _handleShooting(bullets) {
      if (!this.onGround) return; // no shooting in mid-air

      const shootHeld    = input.held('KeyX');
      const shootPressed = input.pressed('KeyX');

      if (this.weapon === 'machinegun') {
        if (shootHeld && this.fireCooldown === 0 && this.machinegunAmmo > 0) {
          this._spawnBullet(bullets, MACHINEGUN_BULLET_SPD);
          this.machinegunAmmo--;
          this.fireCooldown = MACHINEGUN_FIRE_RATE;
          if (this.machinegunAmmo === 0) this.weapon = 'pistol';
        }
      } else {
        if (this.pistolAmmo > 0) {
          if (shootPressed && this.fireCooldown === 0) {
            this._spawnBullet(bullets, PISTOL_BULLET_SPD);
            this.pistolAmmo--;
            this.fireCooldown = 12;
          }
        } else {
          const noPistolBullets = !bullets.some(b => b.owner === 'player');
          if (shootPressed && noPistolBullets && this.emptyFireCooldown === 0) {
            this._spawnBullet(bullets, PISTOL_BULLET_SPD);
            this.emptyFireCooldown = PISTOL_AMMO_EMPTY_COOLDOWN;
          }
        }
      }
    },

    _spawnBullet(bullets, speed) {
      const bx = this.facing === 1 ? this.x + this.w : this.x - BULLET_W;
      const by = this.y + (this.crouching ? PLAYER_BULLET_Y_CROUCH : PLAYER_BULLET_Y_STAND);
      bullets.push({
        x: bx, y: by,
        w: BULLET_W, h: BULLET_H,
        vx: this.facing * speed,
        owner: 'player',
        dead: false,
      });
    },

    _handleDoorEnter(doors) {
      if (!input.pressed('ArrowUp')) return;
      for (const d of doors) {
        const doorFloorY = d.y + DOOR_H;
        if (Math.abs(this.currentFloorY - doorFloorY) > 4) continue;
        const dist = Math.abs((this.x + this.w / 2) - (d.x + DOOR_W / 2));
        if (dist <= DOOR_INTERACT_DIST) {
          this.inDoor = true;
          this.doorRef = d;
          d.open = true;
          this._applyDoorPickup(d);
          break;
        }
      }
    },

    _applyDoorPickup(d) {
      if (d.used) return;
      if (d.type === 'bullet') {
        this.pistolAmmo = PISTOL_AMMO_MAX;
        d.used = true;
      } else if (d.type === 'arms') {
        this.weapon = 'machinegun';
        this.machinegunAmmo = MACHINEGUN_AMMO_MAX;
        d.used = true;
      }
    },

    _updateInDoor(bullets) {
      const exitShoot = input.pressed('KeyX');
      const exitMove  = input.pressed('ArrowLeft') || input.pressed('ArrowRight') || input.pressed('ArrowDown');
      if (exitShoot || exitMove) {
        this.inDoor = false;
        if (this.doorRef) { this.doorRef.open = false; this.doorRef = null; }
        if (exitShoot) this._handleShooting(bullets);
      }
    },

    takeDamage() {
      if (this.invuln > 0 || this.dead) return;
      this.hp--;
      this.invuln = PLAYER_INVULN_FRAMES;
      if (this.hp <= 0) this.dead = true;
    },

    draw(ctx, camX) {
      if (this.inDoor) return;
      if (this.invuln > 0 && Math.floor(this.invuln / 4) % 2 === 0) return;

      const sx = this.x - camX;
      const sy = this.y; // entity.y is always the top of the current hitbox

      if (this.crouching) {
        drawPlayerCrouch(ctx, sx, sy, this.facing);
      } else {
        drawPlayerStand(ctx, sx, sy, this.facing, this.walkFrame);
      }
    }
  };
}
