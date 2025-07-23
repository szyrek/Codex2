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
    for (const r of this.renderers) r.draw(payload);
  }
}
