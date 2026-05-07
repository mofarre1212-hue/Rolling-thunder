import {
  FLOOR_Y_LOWER, FLOOR_Y_UPPER, LEDGE_THICKNESS,
  CANVAS_H, DOOR_W, DOOR_H
} from '../constants.js';

// World width for stage 1
export const WORLD_W = 1536;

// Platforms: { x, y, w, h }
// Lower floor runs the full width at FLOOR_Y_LOWER.
// Upper ledge sections are placed on top of the lower floor.
export const platforms = [
  // Lower floor — full stage
  { x: 0,    y: FLOOR_Y_LOWER, w: WORLD_W, h: CANVAS_H - FLOOR_Y_LOWER },

  // Upper ledge sections
  { x: 160,  y: FLOOR_Y_UPPER, w: 128, h: LEDGE_THICKNESS },
  { x: 400,  y: FLOOR_Y_UPPER, w: 160, h: LEDGE_THICKNESS },
  { x: 672,  y: FLOOR_Y_UPPER, w: 128, h: LEDGE_THICKNESS },
  { x: 920,  y: FLOOR_Y_UPPER, w: 192, h: LEDGE_THICKNESS },
  { x: 1200, y: FLOOR_Y_UPPER, w: 160, h: LEDGE_THICKNESS },
];

// Doors: { x, y, floor ('lower'|'upper'), type ('normal'|'bullet'|'arms'), used }
// Placed flush against the back wall (left edge of door rect = x)
// Door bottom aligns with the floor surface it sits on.
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

// Spawn triggers: { x, spawns: [{floorY, facing, crouch}] }
// Enemies emerge when camera crosses trigger x.
export const spawnTriggers = [
  { x: 200,  fired: false, spawns: [{ x: 320,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false }] },
  { x: 380,  fired: false, spawns: [{ x: 500,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false },
                                     { x: 520,  floorY: FLOOR_Y_UPPER, facing: -1, crouch: true  }] },
  { x: 580,  fired: false, spawns: [{ x: 700,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false },
                                     { x: 680,  floorY: FLOOR_Y_LOWER, facing: -1, crouch: false }] },
  { x: 780,  fired: false, spawns: [{ x: 900,  floorY: FLOOR_Y_UPPER, facing: -1, crouch: false }] },
  { x: 960,  fired: false, spawns: [{ x: 1080, floorY: FLOOR_Y_LOWER, facing: -1, crouch: false },
                                     { x: 1100, floorY: FLOOR_Y_LOWER, facing: -1, crouch: true  },
                                     { x: 1060, floorY: FLOOR_Y_UPPER, facing: -1, crouch: false }] },
  { x: 1200, fired: false, spawns: [{ x: 1350, floorY: FLOOR_Y_LOWER, facing: -1, crouch: false },
                                     { x: 1380, floorY: FLOOR_Y_UPPER, facing: -1, crouch: false }] },
];
