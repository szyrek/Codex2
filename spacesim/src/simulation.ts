import { Vec2 } from 'planck-js';
import { createEventBus, EventBus } from './core/eventBus';
import { GameLoop } from './core/gameLoop';
import { PhysicsEngine, BodyData } from './physics';
import { CompositeRenderer } from './renderers/compositeRenderer';
import { BodyRenderer } from './renderers/bodyRenderer';
import { OverlayRenderer } from './renderers/overlayRenderer';
import { RenderPayload } from './renderers/types';

export interface ScenarioEvent {
  time: number;
  action: 'addBody';
  position: Vec2;
  velocity: Vec2;
  data: BodyData;
}

interface Events {
  tick: number;
  render: RenderPayload;
}

export class Simulation {
  private engine = new PhysicsEngine();
  private bus: EventBus<Events> = createEventBus<Events>();
  private loop = new GameLoop(this.bus);
  private renderer?: CompositeRenderer;
  private time = 0;
  private scenario?: ScenarioEvent[];
  private canvas?: HTMLCanvasElement;
  private overlay?: { start: Vec2; end: Vec2 } | null;

  constructor(canvas?: HTMLCanvasElement) {
    if (canvas) this.setCanvas(canvas);
    this.bus.on('tick', (dt) => this.step(dt));
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d')!;
    this.renderer = new CompositeRenderer(ctx, this.bus, [
      new BodyRenderer(ctx),
      new OverlayRenderer(ctx),
    ]);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  reset() {
    this.engine.reset();
    this.time = 0;
    this.overlay = null;
  }

  private step(dt: number) {
    this.time += dt;
    if (this.scenario) {
      while (this.scenario.length && this.scenario[0].time <= this.time) {
        const ev = this.scenario.shift()!;
        if (ev.action === 'addBody') {
          this.engine.addBody(ev.position, ev.velocity, ev.data);
        }
      }
    }
    this.engine.step(dt);
    this.bus.emit('render', { bodies: this.engine.bodies, throwLine: this.overlay || undefined });
  }

  get bodies() { return this.engine.bodies; }

  addBody(pos: Vec2, vel: Vec2, data: BodyData) {
    return this.engine.addBody(pos, vel, data);
  }

  findBody(pos: Vec2) {
    return this.engine.findBody(pos);
  }

  updateBody(b: ReturnType<PhysicsEngine['addBody']>, d: Partial<BodyData>) {
    this.engine.updateBody(b, d);
  }

  removeBody(b: ReturnType<PhysicsEngine['addBody']>) {
    this.engine.removeBody(b);
  }

  loadScenario(events: ScenarioEvent[]) {
    this.reset();
    this.scenario = [...events].sort((a,b)=>a.time-b.time);
  }

  setOverlay(line: { start: Vec2; end: Vec2 } | null) {
    this.overlay = line;
  }
}
