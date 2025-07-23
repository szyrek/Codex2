import { describe, it, expect } from 'vitest';
import { Simulation } from './simulation';
import { solarSystem } from './scenarios/solarSystem';

describe('Simulation scenarios', () => {
  it('loads scenario and spawns bodies over time', () => {
    const sim = new Simulation();
    sim.loadScenario(solarSystem);
    // run steps enough to process scenario events
    for (let i = 0; i < 10; i++) sim['step'](0.1); // using private method access for test
    expect(sim.bodies.length).toBeGreaterThan(1);
  });
});
