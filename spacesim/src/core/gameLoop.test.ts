import { describe, it, expect, vi } from 'vitest';
import { createEventBus } from './eventBus';
import { GameLoop } from './gameLoop';

describe('GameLoop', () => {
  it('emits tick events while running', () => {
    vi.useFakeTimers();
    const bus = createEventBus<{ tick: number }>();
    const handler = vi.fn();
    bus.on('tick', handler);
    const loop = new GameLoop(bus, 0.1);
    loop.start();
    vi.advanceTimersByTime(300); // 3 steps
    loop.stop();
    expect(handler).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });

  it('accumulates time and emits fixed steps', async () => {
    vi.useRealTimers();
    const bus = createEventBus<{ tick: number }>();
    const dts: number[] = [];
    const loop = new GameLoop(bus, 0.05);
    bus.on('tick', (dt) => {
      dts.push(dt);
      if (dts.length >= 4) loop.stop();
    });
    loop.start();
    await new Promise((r) => setTimeout(r, 70));
    const stop = Date.now();
    while (Date.now() - stop < 200) {}
    await new Promise((r) => setTimeout(r, 70));
    expect(dts[0]).toBeCloseTo(0.05, 2);
    for (const dt of dts) expect(dt).toBeCloseTo(0.05, 2);
    expect(dts.length).toBeGreaterThan(2);
  });
});
