import { animationFrames, Subscription } from 'rxjs';
import type { EventBus } from './eventBus';

export class GameLoop<Events extends Record<string, any>> {
  private sub?: Subscription;
  private last = 0;

  constructor(private bus: EventBus<Events>) {}

  start(): void {
    if (this.sub) return;
    this.sub = animationFrames().subscribe(({ timestamp }) => {
      if (!this.last) this.last = timestamp;
      const dt = (timestamp - this.last) / 1000;
      this.last = timestamp;
      this.bus.emit('tick' as keyof Events, dt);
    });
  }

  stop(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
    this.last = 0;
  }
}
