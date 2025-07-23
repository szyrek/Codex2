import { Vec2 } from 'planck-js';
import type { ScenarioEvent } from '../simulation';

export const jupiterSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec2(0, 0),
    velocity: Vec2(),
    data: { mass: 317.8, radius: 6, color: 'orange', label: 'Jupiter' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(15, 0),
    velocity: Vec2(0, 2.5),
    data: { mass: 0.015, radius: 1, color: 'white', label: 'Io' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(25, 0),
    velocity: Vec2(0, 2),
    data: { mass: 0.008, radius: 1, color: 'lightgray', label: 'Europa' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(40, 0),
    velocity: Vec2(0, 1.6),
    data: { mass: 0.025, radius: 2, color: 'gray', label: 'Ganymede' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(70, 0),
    velocity: Vec2(0, 1.3),
    data: { mass: 0.018, radius: 2, color: 'darkgray', label: 'Callisto' }
  }
];
