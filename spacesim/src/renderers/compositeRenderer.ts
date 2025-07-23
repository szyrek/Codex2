import { RenderPayload } from './types';
import type { EventBus } from '../core/eventBus';

export interface Renderer {
  draw(payload: RenderPayload): void;
}

export class CompositeRenderer {
  constructor(
    private ctx: CanvasRenderingContext2D,
    bus: EventBus<{ render: RenderPayload }>,
    private renderers: Renderer[]
  ) {
    bus.on('render', (payload) => this.draw(payload));
  }

  draw(payload: RenderPayload): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    const view = payload.view ?? { center: { x: 0, y: 0 }, zoom: 1 };
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.scale(view.zoom, view.zoom);
    this.ctx.translate(-view.center.x, -view.center.y);
    for (const r of this.renderers) r.draw(payload);
    this.ctx.restore();
  }
}
