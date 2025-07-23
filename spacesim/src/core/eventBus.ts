import mitt, { Emitter } from 'mitt';

export type EventBus<Events extends Record<string, any>> = Emitter<Events>;

export function createEventBus<Events extends Record<string, any>>(): EventBus<Events> {
  return mitt<Events>();
}
