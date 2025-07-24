import { Vec3 } from '../vector';
import type { ScenarioEvent } from '../simulation';

export const jupiterSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec3(0, 0),
    velocity: Vec3(),
    data: { mass: 317.8, radius: 6, color: 'orange', label: 'Jupiter' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(15, 0),
    velocity: Vec3(0, 2.5),
    data: { mass: 0.015, radius: 1, color: 'white', label: 'Io' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(25, 0),
    velocity: Vec3(0, 2),
    data: { mass: 0.008, radius: 1, color: 'lightgray', label: 'Europa' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(40, 0),
    velocity: Vec3(0, 1.6),
    data: { mass: 0.025, radius: 2, color: 'gray', label: 'Ganymede' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(70, 0),
    velocity: Vec3(0, 1.3),
    data: { mass: 0.018, radius: 2, color: 'darkgray', label: 'Callisto' }
  }
];
