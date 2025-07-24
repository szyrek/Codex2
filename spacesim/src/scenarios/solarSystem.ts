import { Vec2 } from 'planck-js';
import type { ScenarioEvent } from '../simulation';

export const solarSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec2(0, 0),
    velocity: Vec2(),
    data: { mass: 99.4, radius: 7, color: 'yellow', label: 'Sun' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(57.9, 0),
    velocity: Vec2(0, 1.31),
    data: { mass: 0.00002, radius: 1.2, color: 'gray', label: 'Mercury' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(76.5, 76.5),
    velocity: Vec2(-0.68, 0.68),
    data: { mass: 0.00024, radius: 3.0, color: 'orange', label: 'Venus' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(0, 149.6),
    velocity: Vec2(-0.82, 0),
    data: { mass: 0.00030, radius: 3.2, color: 'blue', label: 'Earth' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(-161.1, 161.1),
    velocity: Vec2(-0.47, -0.47),
    data: { mass: 0.00003, radius: 1.7, color: 'red', label: 'Mars' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(-778.5, 0),
    velocity: Vec2(0, -0.36),
    data: { mass: 0.09490, radius: 4.9, color: 'orange', label: 'Jupiter' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(-1013.6, -1013.6),
    velocity: Vec2(0.19, -0.19),
    data: { mass: 0.02842, radius: 4.1, color: 'gold', label: 'Saturn' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(0, -2872.5),
    velocity: Vec2(0.19, 0),
    data: { mass: 0.00434, radius: 1.0, color: 'lightblue', label: 'Uranus' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(3178.5, -3178.5),
    velocity: Vec2(0.11, 0.11),
    data: { mass: 0.00512, radius: 1.0, color: 'blue', label: 'Neptune' }
  }
];
