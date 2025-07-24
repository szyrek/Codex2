import { Vec2 } from 'planck-js';
import type { ScenarioEvent } from '../simulation';

export const solarSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec2(0, 0),
    velocity: Vec2(),
    data: { mass: 332948.2285, radius: 0.69634, color: 'yellow', label: 'Sun' }
  },
  { time: 0.1, action: 'addBody', position: Vec2(57.90, 0.00), velocity: Vec2(-0.00, 75.83), data: { mass: 0.0553, radius: 0.00244, color: 'gray', label: 'Mercury' } },
  { time: 0.1, action: 'addBody', position: Vec2(76.48, 76.48), velocity: Vec2(-39.23, 39.23), data: { mass: 0.8150, radius: 0.00605, color: 'orange', label: 'Venus' } },
  { time: 0.1, action: 'addBody', position: Vec2(0.00, 149.60), velocity: Vec2(-47.18, 0.00), data: { mass: 1.0000, radius: 0.00637, color: 'blue', label: 'Earth' } },
  { time: 0.1, action: 'addBody', position: Vec2(-161.21, 161.21), velocity: Vec2(-27.02, -27.02), data: { mass: 0.1074, radius: 0.00339, color: 'red', label: 'Mars' } },
  { time: 0.1, action: 'addBody', position: Vec2(-778.37, 0.00), velocity: Vec2(-0.00, -20.68), data: { mass: 317.8287, radius: 0.06991, color: 'orange', label: 'Jupiter' } },
  { time: 0.1, action: 'addBody', position: Vec2(-1008.85, -1008.85), velocity: Vec2(10.80, -10.80), data: { mass: 95.1611, radius: 0.05823, color: 'gold', label: 'Saturn' } },
  { time: 0.1, action: 'addBody', position: Vec2(-0.00, -2870.97), velocity: Vec2(10.77, -0.00), data: { mass: 14.5352, radius: 0.02536, color: 'lightblue', label: 'Uranus' } },
  { time: 0.1, action: 'addBody', position: Vec2(3180.69, -3180.69), velocity: Vec2(6.08, 6.08), data: { mass: 17.1477, radius: 0.02462, color: 'blue', label: 'Neptune' } }
];
