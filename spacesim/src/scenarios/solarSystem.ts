import { Vec2 } from 'planck-js';
import type { ScenarioEvent } from '../simulation';

// Scale factors keep planets visible while preserving real mass ratios
const MASS_FACTOR = 0.003; // Earth mass * factor => simulation mass units
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
    data: { mass: 99.4, radius: 7, color: 'yellow', label: 'Sun' }
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
    velocity: Vec2(0, 1.31),
    data: { mass: 0.00002, radius: 1.2, color: 'gray', label: 'Mercury' }
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(76.50895372438445, 76.50895372438444),
    velocity: Vec2(
      -Math.sqrt(333000 * MASS_FACTOR / 108.2) * Math.sin(Math.PI / 4),
      Math.sqrt(333000 * MASS_FACTOR / 108.2) * Math.cos(Math.PI / 4)
    ),
    data: {
      mass: 0.815 * MASS_FACTOR,
      radius: 0.006 * PLANET_RADIUS_SCALE,
      color: 'orange',
      label: 'Venus'
    }
    position: Vec2(76.5, 76.5),
    velocity: Vec2(-0.68, 0.68),
    data: { mass: 0.00024, radius: 3.0, color: 'orange', label: 'Venus' }
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
    velocity: Vec2(-0.82, 0),
    data: { mass: 0.00030, radius: 3.2, color: 'blue', label: 'Earth' }
 
  },
  {
    time: 0.1,
    action: 'addBody',
    position: Vec2(-161.14963543241416, 161.1496354324142),
    velocity: Vec2(
      -Math.sqrt(333000 * MASS_FACTOR / 227.9) * Math.sin((3 * Math.PI) / 4),
      Math.sqrt(333000 * MASS_FACTOR / 227.9) * Math.cos((3 * Math.PI) / 4)
    ),
    data: {
      mass: 0.107 * MASS_FACTOR,
      radius: 0.003 * PLANET_RADIUS_SCALE,
      color: 'red',
      label: 'Mars'
    }
    position: Vec2(-161.1, 161.1),
    velocity: Vec2(-0.47, -0.47),
    data: { mass: 0.00003, radius: 1.7, color: 'red', label: 'Mars' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(-778.6, 0),
    velocity: Vec2(0, -Math.sqrt(333000 * MASS_FACTOR / 778.6)),
    data: {
      mass: 317.8 * MASS_FACTOR,
      radius: 0.07 * PLANET_RADIUS_SCALE,
      color: 'orange',
      label: 'Jupiter'
    }

    position: Vec2(-778.5, 0),
    velocity: Vec2(0, -0.36),
    data: { mass: 0.09490, radius: 4.9, color: 'orange', label: 'Jupiter' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(-1013.6375708309162, -1013.6375708309158),
    velocity: Vec2(
      Math.sqrt(333000 * MASS_FACTOR / 1433.5) * Math.sin((5 * Math.PI) / 4),
      -Math.sqrt(333000 * MASS_FACTOR / 1433.5) * Math.cos((5 * Math.PI) / 4)
    ),
    data: {
      mass: 95.2 * MASS_FACTOR,
      radius: 0.058 * PLANET_RADIUS_SCALE,
      color: 'gold',
      label: 'Saturn'
    }
    position: Vec2(-1013.6, -1013.6),
    velocity: Vec2(0.19, -0.19),
    data: { mass: 0.02842, radius: 4.1, color: 'gold', label: 'Saturn' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(0, -2872.5),
    velocity: Vec2(Math.sqrt(333000 * MASS_FACTOR / 2872.5), 0),
    data: {
      mass: 14.5 * MASS_FACTOR,
      radius: 0.025 * PLANET_RADIUS_SCALE,
      color: 'lightblue',
      label: 'Uranus'
    }
    velocity: Vec2(0.19, 0),
    data: { mass: 0.00434, radius: 1.0, color: 'lightblue', label: 'Uranus' }
  },
  {
    time: 0.2,
    action: 'addBody',
    position: Vec2(3178.515692111649, -3178.515692111651),
    velocity: Vec2(
      Math.sqrt(333000 * MASS_FACTOR / 4495.1) * Math.sin((7 * Math.PI) / 4),
      Math.sqrt(333000 * MASS_FACTOR / 4495.1) * Math.cos((7 * Math.PI) / 4)
    ),
    data: {
      mass: 17.1 * MASS_FACTOR,
      radius: 0.025 * PLANET_RADIUS_SCALE,
      color: 'blue',
      label: 'Neptune'
    }
    position: Vec2(3178.5, -3178.5),
    velocity: Vec2(0.11, 0.11),
    data: { mass: 0.00512, radius: 1.0, color: 'blue', label: 'Neptune' }
  }
];
