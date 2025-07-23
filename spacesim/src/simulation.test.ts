import { describe, it, expect, vi } from 'vitest';
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

  it('scales timestep with speed multiplier', () => {
    const sim = new Simulation();
    const stepSpy = vi.spyOn(sim['engine'], 'step');
    sim.speedUp();
    sim['step'](0.5 as any);
    const arg = stepSpy.mock.calls[0][0];
    expect(arg).toBeCloseTo(1);
  });
});
