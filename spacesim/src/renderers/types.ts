import type planck from 'planck-js';
import type { Vec2 } from 'planck-js';
import type { BodyData } from '../physics';

export interface RenderableBody {
  body: planck.Body;
  data: BodyData;
}

export interface RenderPayload {
  bodies: RenderableBody[];
  throwLine?: { start: Vec2; end: Vec2 };
  view?: { center: Vec2; zoom: number; rotation: number };
}
