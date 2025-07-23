import { RenderPayload } from './types';
import { throwVelocity, predictOrbitType } from '../utils';
import { G } from '../physics';

export class OverlayRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw({ throwLine, bodies }: RenderPayload): void {
    if (!throwLine) return;
    const central = bodies.reduce((a, b) =>
      b.data.mass > a.data.mass ? b : a,
    bodies[0]);
    const vel = throwVelocity(throwLine.start, throwLine.end);
    const type = predictOrbitType(
      throwLine.start,
      vel,
      central.body.getPosition(),
      central.data.mass,
      central.data.radius,
      G
    );
    this.ctx.strokeStyle =
      type === 'escape' ? 'blue' : type === 'crash' ? 'red' : 'green';
    this.ctx.beginPath();
    this.ctx.moveTo(throwLine.start.x, throwLine.start.y);
    this.ctx.lineTo(throwLine.end.x, throwLine.end.y);
    this.ctx.stroke();
  }
}
