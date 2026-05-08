import {
  ENEMY_W, ENEMY_H, ENEMY_CROUCH_H,
  ENEMY_WALK_SPD, ENEMY_CHARGE_SPD,
  ENEMY_SIGHT_RANGE, ENEMY_SHOOT_RANGE, ENEMY_MELEE_RANGE,
  ENEMY_SHOOT_COOLDOWN, ENEMY_AIM_FRAMES, ENEMY_ALERT_FRAMES,
  ENEMY_HURT_FRAMES,
  ENEMY_BULLET_SPD, ENEMY_BULLET_Y_STAND, ENEMY_BULLET_Y_CROUCH,
  BULLET_W, BULLET_H,
} from '../constants.js';
import { applyPhysics } from '../systems/physics.js';
import {
  drawGruntStand, drawRiflemanStand, drawRiflemanCrouch, drawEnemyDead,
} from '../sprites/enemySprite.js';

export function createEnemy(x, floorY, facing, type, preferCrouch) {
  return {
    x,
    y: floorY - ENEMY_H,
    w: ENEMY_W,
    h: ENEMY_H,
    crouchH: ENEMY_CROUCH_H,
    vy: 0,
    facing,
    crouching: false,
    onGround: true,
    currentFloorY: floorY,

    type,           // 'grunt' | 'rifleman'
    preferCrouch: !!preferCrouch,
    hp: type === 'grunt' ? 1 : 2,

    // Shared state machine field (both types use it, never simultaneously)
    state: 'idle',  // idle | charge | aim | shoot | recover | dead
    stateTimer: 0,
    hurtTimer: 0,

    dead: false,
    deathTimer: 0,
    scored: false,

    update(player, platforms, bullets) {
      if (this.dead) { this.deathTimer++; return; }

      if (this.stateTimer > 0) this.stateTimer--;
      if (this.hurtTimer  > 0) this.hurtTimer--;

      if (this.type === 'grunt')    this._updateGrunt(player);
      else                          this._updateRifleman(player, bullets);

      applyPhysics(this, platforms);
    },

    // ── Grunt: idle until in sight, then charge and melee ──────────────────────
    _updateGrunt(player) {
      const dx   = (player.x + player.w / 2) - (this.x + this.w / 2);
      const dist = Math.abs(dx);
      this.facing = dx > 0 ? 1 : -1;

      if (dist <= ENEMY_SIGHT_RANGE) {
        this.state = 'charge';
        if (dist <= ENEMY_MELEE_RANGE) {
          // stateTimer doubles as attack cooldown; inDoor = immune
          if (this.stateTimer === 0 && !player.inDoor) {
            player.takeDamage();
            this.stateTimer = 50;
          }
        } else {
          this.x += this.facing * ENEMY_CHARGE_SPD;
        }
      } else {
        this.state = 'idle';
      }
    },

    // ── Rifleman: advance into range, aim (optionally crouch), fire ────────────
    _updateRifleman(player, bullets) {
      const dx         = (player.x + player.w / 2) - (this.x + this.w / 2);
      const dist       = Math.abs(dx);
      const diffFloorY = Math.abs(this.currentFloorY - player.currentFloorY);

      this.facing = dx > 0 ? 1 : -1;

      // Don't engage player on a different walkway level
      if (diffFloorY > 16) {
        this.state = 'idle';
        this._standUp();
        return;
      }

      switch (this.state) {
        case 'idle':
          if (dist < ENEMY_SIGHT_RANGE) {
            this.state = 'alert';
            this.stateTimer = ENEMY_ALERT_FRAMES;
          }
          break;

        case 'alert':
          // Freeze briefly — visible "oh!" moment before engaging
          if (this.stateTimer <= 0) this.state = 'advance';
          break;

        case 'advance':
          if (dist > ENEMY_SHOOT_RANGE) {
            this.x += this.facing * ENEMY_WALK_SPD;
          } else {
            this.state = 'aim';
            this.stateTimer = ENEMY_AIM_FRAMES;
            // Commit to crouch at start of aim
            if (this.preferCrouch) this._crouch();
          }
          break;

        case 'aim':
          if (this.stateTimer <= 0) this.state = 'shoot';
          break;

        case 'shoot':
          this._fire(bullets);
          this.state = 'recover';
          this.stateTimer = ENEMY_SHOOT_COOLDOWN;
          break;

        case 'recover':
          this._standUp();
          if (this.stateTimer <= 0) {
            this.state = dist < ENEMY_SIGHT_RANGE ? 'advance' : 'idle';
          }
          break;
      }
    },

    _fire(bullets) {
      const bx = this.facing === 1 ? this.x + this.w : this.x - BULLET_W;
      const by = this.y + (this.crouching ? ENEMY_BULLET_Y_CROUCH : ENEMY_BULLET_Y_STAND);
      bullets.push({ x: bx, y: by, w: BULLET_W, h: BULLET_H,
                     vx: this.facing * ENEMY_BULLET_SPD,
                     owner: 'enemy', dead: false });
    },

    _crouch() {
      if (this.crouching) return;
      this.crouching = true;
      this.y = this.currentFloorY - this.crouchH;
    },

    _standUp() {
      if (!this.crouching) return;
      this.crouching = false;
      this.y = this.currentFloorY - this.h;
    },

    takeDamage() {
      if (this.dead) return;
      this.hp--;
      if (this.hp <= 0) {
        this.dead = true;
        // Snap to floor so dead sprite renders correctly
        this._standUp();
      } else {
        // First-hit stagger (rifleman only reaches here)
        this.hurtTimer = ENEMY_HURT_FRAMES;
        this.state = 'recover';
        this.stateTimer = 30;
        this._standUp();
      }
    },

    draw(ctx, camX) {
      const sx = Math.round(this.x - camX);
      const sy = Math.round(this.y);

      if (this.dead) {
        drawEnemyDead(ctx, sx, sy, this.type);
        return;
      }

      // Hurt blink
      if (this.hurtTimer > 0 && Math.floor(this.hurtTimer / 3) % 2 === 0) return;

      if (this.type === 'grunt') {
        drawGruntStand(ctx, sx, sy, this.facing, this.state === 'charge');
      } else if (this.crouching) {
        drawRiflemanCrouch(ctx, sx, sy, this.facing);
      } else {
        drawRiflemanStand(ctx, sx, sy, this.facing);
      }
    },
  };
}
