import {
  FLOOR_Y_LOWER, FLOOR_Y_UPPER, LEDGE_THICKNESS,
  CANVAS_H, DOOR_W, DOOR_H
} from '../constants.js';

export const WORLD_W = 1536;

// Platforms
export const platforms = [
  { x: 0,    y: FLOOR_Y_LOWER, w: WORLD_W, h: CANVAS_H - FLOOR_Y_LOWER },
  { x: 160,  y: FLOOR_Y_UPPER, w: 128, h: LEDGE_THICKNESS },
  { x: 400,  y: FLOOR_Y_UPPER, w: 160, h: LEDGE_THICKNESS },
  { x: 672,  y: FLOOR_Y_UPPER, w: 128, h: LEDGE_THICKNESS },
  { x: 920,  y: FLOOR_Y_UPPER, w: 192, h: LEDGE_THICKNESS },
  { x: 1200, y: FLOOR_Y_UPPER, w: 160, h: LEDGE_THICKNESS },
];

export function buildDoors() {
  return [
    { x: 80,   y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'normal', used: false, open: false },
    { x: 200,  y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'bullet', used: false, open: false },
    { x: 320,  y: FLOOR_Y_UPPER - DOOR_H, floor: 'upper', type: 'normal', used: false, open: false },
    { x: 480,  y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'arms',   used: false, open: false },
    { x: 560,  y: FLOOR_Y_UPPER - DOOR_H, floor: 'upper', type: 'normal', used: false, open: false },
    { x: 700,  y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'bullet', used: false, open: false },
    { x: 780,  y: FLOOR_Y_UPPER - DOOR_H, floor: 'upper', type: 'normal', used: false, open: false },
    { x: 900,  y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'normal', used: false, open: false },
    { x: 1000, y: FLOOR_Y_UPPER - DOOR_H, floor: 'upper', type: 'arms',   used: false, open: false },
    { x: 1100, y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'bullet', used: false, open: false },
    { x: 1300, y: FLOOR_Y_LOWER - DOOR_H, floor: 'lower', type: 'normal', used: false, open: false },
    { x: 1420, y: FLOOR_Y_UPPER - DOOR_H, floor: 'upper', type: 'normal', used: false, open: false },
  ];
}

// Spawn triggers — x must be > CANVAS_W (384) so none fire at game start.
// Trigger fires when the camera's right edge reaches trigger.x.
// Enemies spawn ahead of the player (to the right) and walk left.
export const spawnTriggers = [
  { x: 440,  fired: false, spawns: [
    { x: 550,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false, type: 'grunt'    },
  ]},
  { x: 620,  fired: false, spawns: [
    { x: 740,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false, type: 'rifleman' },
    { x: 760,  floorY: FLOOR_Y_UPPER, facing: -1, crouch: true,  type: 'rifleman' },
  ]},
  { x: 840,  fired: false, spawns: [
    { x: 950,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false, type: 'grunt'    },
    { x: 970,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false, type: 'grunt'    },
  ]},
  { x: 1020, fired: false, spawns: [
    { x: 1120, floorY: FLOOR_Y_UPPER, facing: -1, crouch: false, type: 'rifleman' },
  ]},
  { x: 1160, fired: false, spawns: [
    { x: 1280, floorY: FLOOR_Y_LOWER, facing: -1, crouch: false, type: 'rifleman' },
    { x: 1300, floorY: FLOOR_Y_LOWER, facing: -1, crouch: true,  type: 'rifleman' },
    { x: 1260, floorY: FLOOR_Y_UPPER, facing: -1, crouch: false, type: 'grunt'    },
  ]},
  { x: 1360, fired: false, spawns: [
    { x: 1460, floorY: FLOOR_Y_LOWER, facing: -1, crouch: false, type: 'grunt'    },
    { x: 1490, floorY: FLOOR_Y_UPPER, facing: -1, crouch: false, type: 'rifleman' },
  ]},
];
