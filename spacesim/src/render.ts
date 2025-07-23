export interface RenderableBody {
  body: planck.Body;
  data: {
    radius: number;
    color: string;
    label: string;
  };
}

import planck from 'planck-js';

/**
 * Draw all bodies to a canvas context.
 */
export function renderBodies(
  ctx: CanvasRenderingContext2D,
  bodies: RenderableBody[]
): void {
  for (const obj of bodies) {
    const pos = obj.body.getPosition();
    ctx.beginPath();
    ctx.fillStyle = obj.data.color;
    ctx.arc(pos.x, pos.y, obj.data.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(obj.data.label, pos.x + obj.data.radius + 2, pos.y - 2);
  }
}
