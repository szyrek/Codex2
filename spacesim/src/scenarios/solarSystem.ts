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
    position: Vec2(40, 0),
    velocity: Vec2(0, 4.8),
    data: { mass: 0.055, radius: 1, color: 'gray', label: 'Mercury' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(70, 0),
    velocity: Vec2(0, 3.5),
    data: { mass: 0.815, radius: 2, color: 'orange', label: 'Venus' }
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
    velocity: Vec2(0, 2.4),
    data: { mass: 0.107, radius: 2, color: 'red', label: 'Mars' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(300, 0),
    velocity: Vec2(0, 1.5),
    data: { mass: 317.8, radius: 6, color: 'orange', label: 'Jupiter' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(400, 0),
    velocity: Vec2(0, 1.2),
    data: { mass: 95, radius: 5, color: 'gold', label: 'Saturn' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(500, 0),
    velocity: Vec2(0, 1),
    data: { mass: 14, radius: 4, color: 'lightblue', label: 'Uranus' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(600, 0),
    velocity: Vec2(0, 0.8),
    data: { mass: 17, radius: 4, color: 'blue', label: 'Neptune' }
  }
];
