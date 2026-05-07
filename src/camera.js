import { CANVAS_W, CANVAS_H, CAM_LEAD, CAM_LERP } from './constants.js';

export const camera = {
  x: 0,   // world x of left edge of viewport
  worldW: 0,

  init(worldW) {
    this.x = 0;
    this.worldW = worldW;
  },

  follow(player) {
    const target = player.x - CANVAS_W / 2 + CAM_LEAD;
    this.x += (target - this.x) * CAM_LERP;
    this.x = Math.max(0, Math.min(this.x, this.worldW - CANVAS_W));
  },

  // World → screen
  toScreenX(wx) { return wx - this.x; },
  toScreenY(wy) { return wy; },

  // Is a world rect at least partially visible?
  visible(wx, wy, w, h) {
    return wx + w > this.x && wx < this.x + CANVAS_W &&
           wy + h > 0      && wy < CANVAS_H;
  }
};
