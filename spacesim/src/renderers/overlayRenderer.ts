import { RenderPayload } from './types';
import { throwVelocity, predictOrbitType } from '../utils';
import { G } from '../physics';
import { Vec2 } from 'planck-js';

function simulateOrbit(
  pos: Vec2,
  vel: Vec2,
  central: Vec2,
  mass: number,
  radius: number,
  steps = 180,
  dt = 0.1
) {
  const pts: Vec2[] = [];
  let p = pos.clone();
  let v = vel.clone();
  for (let i = 0; i < steps; i++) {
    const r = p.clone().sub(central);
    const distSq = r.lengthSquared();
    if (distSq <= radius * radius) break;
    const acc = r.clone().mul((-G * mass) / Math.pow(distSq, 1.5));
    v = v.clone().add(acc.mul(dt));
    p = p.clone().add(v.clone().mul(dt));
    pts.push(p.clone());
  }
  return pts;
}

export class OverlayRenderer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw({ throwLine, bodies }: RenderPayload): void {
    if (!bodies.length) return;
    const central = bodies.reduce((a, b) =>
      b.data.mass > a.data.mass ? b : a,
    bodies[0]);
    const cPos = central.body.getPosition();
    this.ctx.setLineDash([2, 2]);
    for (const b of bodies) {
      if (b === central) continue;
      const pos = b.body.getPosition();
      const vel = b.body.getLinearVelocity();
      const type = predictOrbitType(
        pos,
        vel,
        cPos,
        central.data.mass,
        central.data.radius,
        G
      );
      this.ctx.strokeStyle =
        type === 'escape' ? 'blue' : type === 'crash' ? 'red' : b.data.color;
      const pts = simulateOrbit(
        pos,
        vel,
        cPos,
        central.data.mass,
        central.data.radius
      );
      if (pts.length) {
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
        for (const p of pts) this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
      }
    }
    this.ctx.setLineDash([]);

    if (!throwLine) return;
    const vel = throwVelocity(throwLine.start, throwLine.end);
    const type = predictOrbitType(
      throwLine.start,
      vel,
      cPos,
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
