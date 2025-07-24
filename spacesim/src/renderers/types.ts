import type { Vec3 } from '../vector';
import type { Body } from '../physics';
import type { BodyData } from '../physics';

export interface RenderableBody {
  body: Body;
  data: BodyData;
}

export interface RenderPayload {
  bodies: RenderableBody[];
  throwLine?: { start: Vec3; end: Vec3 };
  view?: { center: Vec3; zoom: number };
}
