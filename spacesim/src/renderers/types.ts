import type { RigidBody } from '@dimforge/rapier2d-compat';
import type { Vector } from '../vec2';
import type { BodyData } from '../physics';

export interface RenderableBody {
  body: RigidBody;
  data: BodyData;
}

export interface RenderPayload {
  bodies: RenderableBody[];
  throwLine?: { start: Vector; end: Vector };
  view?: { center: Vector; zoom: number };
}
