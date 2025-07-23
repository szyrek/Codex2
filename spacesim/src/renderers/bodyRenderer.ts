import planck from 'planck-js';
import { RenderPayload } from './types';

export function renderBodies(ctx: CanvasRenderingContext2D, bodies: RenderPayload['bodies']): void {
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

export class BodyRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw({ bodies }: RenderPayload): void {
    renderBodies(this.ctx, bodies);
  }
}
