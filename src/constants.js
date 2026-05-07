// Canvas / display
export const CANVAS_W = 384;
export const CANVAS_H = 224;
export const SCALE    = 2;

// World geometry
export const FLOOR_Y_LOWER  = 160; // y of lower walkway surface
export const FLOOR_Y_UPPER  = 96;  // y of upper ledge surface
export const LEDGE_THICKNESS = 8;

// Player dimensions
export const PLAYER_W       = 12;
export const PLAYER_H       = 24;
export const PLAYER_CROUCH_H = 14;

// Player movement
export const PLAYER_WALK_SPD  = 1.6;
export const PLAYER_JUMP_VY   = -7.5; // initial upward velocity
export const GRAVITY           = 0.32;
export const PLAYER_MAX_FALL   = 8;

// Player combat
export const PISTOL_BULLET_SPD   = 4;
export const PISTOL_AMMO_MAX     = 30;
export const PISTOL_AMMO_EMPTY_COOLDOWN = 40; // frames between shots when ammo=0
export const MACHINEGUN_BULLET_SPD = 5;
export const MACHINEGUN_AMMO_MAX  = 60;
export const MACHINEGUN_FIRE_RATE = 8; // frames between shots
export const BULLET_W = 6;
export const BULLET_H = 3;
export const PLAYER_BULLET_Y_STAND  = 10; // offset from entity top
export const PLAYER_BULLET_Y_CROUCH = 18;

// Player health / damage
export const PLAYER_MAX_HP      = 3;
export const PLAYER_INVULN_FRAMES = 90;

// Camera
export const CAM_LEAD      = 120; // pixels ahead of player camera tries to show
export const CAM_LERP      = 0.08;

// Enemy dimensions
export const ENEMY_W = 12;
export const ENEMY_H = 24;
export const ENEMY_CROUCH_H = 14;

// Enemy movement / AI
export const ENEMY_WALK_SPD     = 0.8;
export const ENEMY_SIGHT_RANGE  = 180;
export const ENEMY_SHOOT_RANGE  = 160;
export const ENEMY_SHOOT_COOLDOWN = 90; // frames between enemy shots
export const ENEMY_BULLET_SPD   = 3;
export const ENEMY_BULLET_Y_STAND  = 10;
export const ENEMY_BULLET_Y_CROUCH = 18;

// Doors
export const DOOR_W = 16;
export const DOOR_H = 32;
export const DOOR_INTERACT_DIST = 20;

// Game timer
export const STAGE_TIME_SECONDS = 90;

// HUD
export const HUD_H = 20;

// Colors (placeholder art palette)
export const COL_BG           = '#282830';
export const COL_FLOOR_LOWER  = '#009898'; // teal arcade floor
export const COL_FLOOR_UPPER  = '#007878'; // slightly darker teal for upper ledge
export const COL_WALL         = '#50505c'; // medium gray industrial wall
export const COL_PLAYER       = '#c8a050';
export const COL_PLAYER_HURT  = '#ff4444';
export const COL_ENEMY        = '#8b3a3a';
export const COL_ENEMY_ALERT  = '#cc5533';
export const COL_BULLET_PLAYER= '#ffff88';
export const COL_BULLET_ENEMY = '#ff6644';
export const COL_DOOR_BULLET  = '#4488ff';
export const COL_DOOR_ARMS    = '#ff8800';
export const COL_DOOR_NORMAL  = '#554433';
export const COL_HUD_BG       = '#0a0a0a';
export const COL_HUD_TEXT     = '#e8e8c0';
export const COL_HP_FULL      = '#44ff44';
export const COL_HP_EMPTY     = '#333';
