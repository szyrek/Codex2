import type { Vec2 } from '../vec';
import type { Body } from '../physics';
import type { BodyData } from '../physics';

export interface RenderableBody {
  body: Body;
  data: BodyData;
}

export interface RenderPayload {
  bodies: RenderableBody[];
  throwLine?: { start: Vec2; end: Vec2 };
  view?: { center: Vec2; zoom: number };
}
