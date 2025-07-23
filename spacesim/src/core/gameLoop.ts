import { interval, Subscription, animationFrameScheduler } from 'rxjs';
import type { EventBus } from './eventBus';

export class GameLoop<Events extends Record<string, any>> {
  private sub?: Subscription;
  constructor(private bus: EventBus<Events>, private step = 1 / 60) {}

  start(): void {
    if (this.sub) return;
    this.sub = interval(this.step * 1000, animationFrameScheduler).subscribe(() => {
      this.bus.emit('tick' as keyof Events, this.step);
    });
  }

  stop(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
  }
}
