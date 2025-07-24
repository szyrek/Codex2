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
  }
];
