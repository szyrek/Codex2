import { interval, Subscription, animationFrameScheduler } from 'rxjs';
import type { EventBus } from './eventBus';

export class GameLoop<Events extends Record<string, any>> {
  private sub?: Subscription;
  private last = 0;
  private accumulator = 0;

  constructor(private bus: EventBus<Events>, private step = 1 / 60) {}

  start(): void {
    if (this.sub) return;
    this.last = Date.now();
    this.sub = interval(this.step * 1000, animationFrameScheduler).subscribe(() => {
      const now = Date.now();
      this.accumulator += (now - this.last) / 1000;
      this.last = now;
      while (this.accumulator >= this.step) {
        this.bus.emit('tick' as keyof Events, this.step);
        this.accumulator -= this.step;
      }
    });
  }

  stop(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
    this.accumulator = 0;
  }
}
