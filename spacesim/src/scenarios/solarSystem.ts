import { Vec2 } from 'planck-js';
import type { ScenarioEvent } from '../simulation';

const MASS_FACTOR = 0.003;
const PLANET_RADIUS_SCALE = 500;
const SUN_RADIUS_SCALE = 50;

export const solarSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec2(0, 0),
    velocity: Vec2(),
    data: {
      mass: 333000 * MASS_FACTOR,
      radius: 0.696 * SUN_RADIUS_SCALE,
      color: 'yellow',
      label: 'Sun'
    }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(57.9, 0),
    velocity: Vec2(0, Math.sqrt(333000 * MASS_FACTOR / 57.9)),
    data: {
      mass: 0.0553 * MASS_FACTOR,
      radius: 0.002 * PLANET_RADIUS_SCALE,
      color: 'gray',
      label: 'Mercury'
    }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(0, 149.6),
    velocity: Vec2(-Math.sqrt(333000 * MASS_FACTOR / 149.6), 0),
    data: {
      mass: 1 * MASS_FACTOR,
      radius: 0.006 * PLANET_RADIUS_SCALE,
      color: 'blue',
      label: 'Earth'
    }
  }
];
