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
  COL_PLAYER, COL_PLAYER_HURT,
  DOOR_W, DOOR_H, DOOR_INTERACT_DIST
} from '../constants.js';
import { input } from '../input.js';
import { applyPhysics } from '../systems/physics.js';

export function createPlayer() {
  return {
    x: 24,
    y: FLOOR_Y_LOWER - PLAYER_H,
    w: PLAYER_W,
    h: PLAYER_H,
    crouchH: PLAYER_CROUCH_H,
    vx: 0,
    vy: 0,
    facing: 1,       // 1=right, -1=left
    crouching: false,
    onGround: true,
    currentFloorY: FLOOR_Y_LOWER,
    hp: PLAYER_MAX_HP,
    invuln: 0,        // invulnerability frames remaining
    dead: false,

    // Weapon state
    weapon: 'pistol', // 'pistol' | 'machinegun'
    pistolAmmo: PISTOL_AMMO_MAX,
    machinegunAmmo: 0,
    fireCooldown: 0,
    emptyFireCooldown: 0,

    // Door state
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

      // Crouch
      this.crouching = down && this.onGround;

      // Horizontal
      if (!this.crouching) {
        if (left)  { this.x -= PLAYER_WALK_SPD; this.facing = -1; }
        if (right) { this.x += PLAYER_WALK_SPD; this.facing = 1;  }
      }
      this.x = Math.max(0, this.x);

      // Jump
      if (jump && this.onGround && !this.crouching) {
        this.vy = PLAYER_JUMP_VY;
        this.onGround = false;
      }

      applyPhysics(this, platforms);
    },

    _handleShooting(bullets) {
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
        // Pistol
        if (this.pistolAmmo > 0) {
          if (shootPressed && this.fireCooldown === 0) {
            this._spawnBullet(bullets, PISTOL_BULLET_SPD);
            this.pistolAmmo--;
            this.fireCooldown = 12;
          }
        } else {
          // Empty pistol: one slow bullet, must clear first
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
        // Must be on same floor level and adjacent
        const sameLevelY = this.currentFloorY;
        const doorFloorY = d.y + DOOR_H;
        if (Math.abs(sameLevelY - doorFloorY) > 4) continue;
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
      // Exit door when player presses shoot (fire as they exit) or move
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
      if (this.inDoor) return; // hidden inside door

      const sx = this.x - camX;
      const h  = this.crouching ? this.crouchH : this.h;
      const sy = this.y + (this.h - h); // anchor bottom

      // Blink during invuln
      if (this.invuln > 0 && Math.floor(this.invuln / 4) % 2 === 0) return;

      ctx.fillStyle = this.hp < PLAYER_MAX_HP && this.invuln > 0 ? COL_PLAYER_HURT : COL_PLAYER;
      ctx.fillRect(sx, sy, this.w, h);

      // Head
      ctx.fillStyle = '#d4aa60';
      if (!this.crouching) ctx.fillRect(sx + 2, sy, 8, 7);

      // Facing indicator (gun arm)
      ctx.fillStyle = '#a08040';
      if (this.facing === 1) {
        ctx.fillRect(sx + this.w, sy + (this.crouching ? 4 : 8), 4, 3);
      } else {
        ctx.fillRect(sx - 4, sy + (this.crouching ? 4 : 8), 4, 3);
      }
    }
  };
}
