import { describe, it, expect, vi } from 'vitest';
import { createEventBus } from './eventBus';
import { GameLoop } from './gameLoop';

describe('GameLoop', () => {
  it('emits tick events while running', () => {
    vi.useFakeTimers();
    const bus = createEventBus<{ tick: number }>();
    const handler = vi.fn();
    bus.on('tick', handler);
    const loop = new GameLoop(bus);
    loop.start();
    vi.advanceTimersByTime(48); // ~3 frames
    loop.stop();
    expect(handler).toHaveBeenCalledTimes(3);
    vi.useRealTimers();
  });

  it('passes frame delta to handlers', () => {
    vi.useFakeTimers();
    const bus = createEventBus<{ tick: number }>();
    const dts: number[] = [];
    const loop = new GameLoop(bus);
    bus.on('tick', (dt) => {
      dts.push(dt);
      if (dts.length >= 3) loop.stop();
    });
    loop.start();
    vi.advanceTimersByTime(48);
    expect(dts.length).toBe(3);
    for (const dt of dts) expect(dt).toBeGreaterThanOrEqual(0);
    vi.useRealTimers();
  });
});
