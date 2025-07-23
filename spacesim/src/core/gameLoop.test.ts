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
});
