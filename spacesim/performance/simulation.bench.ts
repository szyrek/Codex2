import { bench } from 'vitest';
import { PhysicsEngine } from '../src/physics/engine';
import { Vec2 } from 'planck-js';

function createEngine(count: number) {
  const engine = new PhysicsEngine();
  for (let i = 0; i < count; i++) {
    engine.addBody(Vec2(i, 0), Vec2(0, 0), {
      mass: 1,
      radius: 1,
      color: '#fff',
      label: String(i),
    });
  }
  return engine;
}

const step = 1 / 60;

const engine200 = createEngine(200);
bench('step 200 bodies', () => {
  engine200.step(step);
});

const engine500 = createEngine(500);
bench('step 500 bodies', () => {
  engine500.step(step);
});

const engine1000 = createEngine(1000);
bench('step 1000 bodies', () => {
  engine1000.step(step);
});

// Speed-up test: large dt
const fastEngine = createEngine(200);
bench('step 200 bodies x10 speed', () => {
  fastEngine.step(step * 10);
});
