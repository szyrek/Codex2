import { interval, Subscription, animationFrameScheduler } from 'rxjs';
import type { EventBus } from './eventBus';

export class GameLoop<Events extends Record<string, any>> {
  private sub?: Subscription;
  private last = 0;

  constructor(private bus: EventBus<Events>, private step = 1 / 60) {}

  start(): void {
    if (this.sub) return;
    this.last = Date.now();
    this.sub = interval(this.step * 1000, animationFrameScheduler).subscribe(() => {
      const now = Date.now();
      const dt = (now - this.last) / 1000;
      this.last = now;
      this.bus.emit('tick' as keyof Events, dt);
    });
  }

  stop(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
  }
}
