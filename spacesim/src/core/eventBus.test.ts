import { describe, it, expect, vi } from 'vitest';
import { createEventBus } from './eventBus';

describe('EventBus', () => {
  it('subscribes and emits events', () => {
    const bus = createEventBus<{ ping: number }>();
    const handler = vi.fn();
    bus.on('ping', handler);
    bus.emit('ping', 42);
    expect(handler).toHaveBeenCalledWith(42);
  });
});
