import { RenderPayload } from './types';

export class OverlayRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw({ throwLine }: RenderPayload): void {
    if (!throwLine) return;
    this.ctx.strokeStyle = 'green';
    this.ctx.beginPath();
    this.ctx.moveTo(throwLine.start.x, throwLine.start.y);
    this.ctx.lineTo(throwLine.end.x, throwLine.end.y);
    this.ctx.stroke();
  }
}
