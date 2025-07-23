import { Vec2 } from 'planck-js';
import type { ScenarioEvent } from '../simulation';

export const solarSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec2(0, 0),
    velocity: Vec2(),
    data: { mass: 1000, radius: 10, color: 'yellow', label: 'Sun' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(100, 0),
    velocity: Vec2(0, 3),
    data: { mass: 1, radius: 4, color: 'blue', label: 'Earth' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(150, 0),
    velocity: Vec2(0, 2.5),
    data: { mass: 0.1, radius: 2, color: 'gray', label: 'Mars' }
  }
];
