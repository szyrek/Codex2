import { Vec3 } from '../vector';
import type { ScenarioEvent } from '../simulation';

export const solarSystem: ScenarioEvent[] = [
  {
    time: 0,
    action: 'addBody',
    position: Vec3(0, 0),
    velocity: Vec3(),
    data: { mass: 332948.2285, radius: 0.69634, color: 'yellow', label: 'Sun' }
  },
  { time: 0.1, action: 'addBody', position: Vec3(57.90, 0.00), velocity: Vec3(-0.00, 75.83), data: { mass: 0.0553, radius: 0.00244, color: 'gray', label: 'Mercury' } },
  { time: 0.1, action: 'addBody', position: Vec3(76.48, 76.48), velocity: Vec3(-39.23, 39.23), data: { mass: 0.8150, radius: 0.00605, color: 'orange', label: 'Venus' } },
  { time: 0.1, action: 'addBody', position: Vec3(0.00, 149.60), velocity: Vec3(-47.18, 0.00), data: { mass: 1.0000, radius: 0.00637, color: 'blue', label: 'Earth' } },
  { time: 0.1, action: 'addBody', position: Vec3(-161.21, 161.21), velocity: Vec3(-27.02, -27.02), data: { mass: 0.1074, radius: 0.00339, color: 'red', label: 'Mars' } },
  { time: 0.1, action: 'addBody', position: Vec3(-778.37, 0.00), velocity: Vec3(-0.00, -20.68), data: { mass: 317.8287, radius: 0.06991, color: 'orange', label: 'Jupiter' } },
  { time: 0.1, action: 'addBody', position: Vec3(-1008.85, -1008.85), velocity: Vec3(10.80, -10.80), data: { mass: 95.1611, radius: 0.05823, color: 'gold', label: 'Saturn' } },
  { time: 0.1, action: 'addBody', position: Vec3(-0.00, -2870.97), velocity: Vec3(10.77, -0.00), data: { mass: 14.5352, radius: 0.02536, color: 'lightblue', label: 'Uranus' } },
  { time: 0.1, action: 'addBody', position: Vec3(3180.69, -3180.69), velocity: Vec3(6.08, 6.08), data: { mass: 17.1477, radius: 0.02462, color: 'blue', label: 'Neptune' } }
    data: { mass: 99.4, radius: 7, color: 'yellow', label: 'Sun' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(57.9, 0),
    velocity: Vec3(0, 1.31),
    data: { mass: 0.00002, radius: 1.2, color: 'gray', label: 'Mercury' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(76.5, 76.5),
    velocity: Vec3(-0.68, 0.68),
    data: { mass: 0.00024, radius: 3.0, color: 'orange', label: 'Venus' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(0, 149.6),
    velocity: Vec3(-0.82, 0),
    data: { mass: 0.00030, radius: 3.2, color: 'blue', label: 'Earth' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec3(-161.1, 161.1),
    velocity: Vec3(-0.47, -0.47),
    data: { mass: 0.00003, radius: 1.7, color: 'red', label: 'Mars' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec3(-778.5, 0),
    velocity: Vec3(0, -0.36),
    data: { mass: 0.09490, radius: 4.9, color: 'orange', label: 'Jupiter' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec3(-1013.6, -1013.6),
    velocity: Vec3(0.19, -0.19),
    data: { mass: 0.02842, radius: 4.1, color: 'gold', label: 'Saturn' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec3(0, -2872.5),
    velocity: Vec3(0.19, 0),
    data: { mass: 0.00434, radius: 1.0, color: 'lightblue', label: 'Uranus' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec3(3178.5, -3178.5),
    velocity: Vec3(0.11, 0.11),
    data: { mass: 0.00512, radius: 1.0, color: 'blue', label: 'Neptune' }
  }
];
