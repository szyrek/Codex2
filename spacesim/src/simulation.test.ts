import { describe, it, expect, vi } from 'vitest';
import { Simulation } from './simulation';
import { solarSystem } from './scenarios/solarSystem';
import { jupiterSystem } from './scenarios/jupiterSystem';

describe('Simulation scenarios', () => {
  it('loads scenario and spawns bodies over time', () => {
    const sim = new Simulation();
    sim.loadScenario(solarSystem);
    // run steps enough to process all scenario events
    for (let i = 0; i < 30; i++) sim['step'](0.1); // using private method access for test
    expect(sim.bodies.length).toBe(solarSystem.length);
  });

  it('loads jupiter system scenario', () => {
    const sim = new Simulation();
    sim.loadScenario(jupiterSystem);
    for (let i = 0; i < 20; i++) sim['step'](0.1);
    expect(sim.bodies.length).toBe(jupiterSystem.length);
  });

  it('scales timestep with speed multiplier', () => {
    const sim = new Simulation();
    const stepSpy = vi.spyOn(sim['engine'], 'step');
    sim.speedUp();
    sim['step'](0.05 as any);
    const total = stepSpy.mock.calls.reduce((s, c) => s + c[0], 0);
    expect(total).toBeCloseTo(0.1);
  });

  it('tracks elapsed time', () => {
    const sim = new Simulation();
    sim['step'](0.05 as any);
    expect(sim.time).toBeCloseTo(0.05);
    sim.speedUp();
    sim['step'](0.05 as any);
    expect(sim.time).toBeCloseTo(0.15);
  });
});
