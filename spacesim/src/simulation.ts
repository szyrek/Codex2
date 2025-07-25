import { Vec3 } from './vector';
import { createEventBus, EventBus } from './core/eventBus';
import { GameLoop } from './core/gameLoop';
import { PhysicsEngine, BodyData, BodyUpdate } from './physics';
import { ThreeRenderer } from './renderers/threeRenderer';
import { RenderPayload } from './renderers/types';

export interface ScenarioEvent {
  time: number;
  action: 'addBody';
  position: Vec3;
  velocity: Vec3;
  data: BodyData;
}

interface Events {
  tick: number;
  render: RenderPayload;
  bodyUpdate: { body: ReturnType<PhysicsEngine['addBody']>; updates: BodyUpdate };
}

export class Simulation {
  private engine = new PhysicsEngine();
  private bus: EventBus<Events> = createEventBus<Events>();
  private loop = new GameLoop(this.bus);
  private renderer?: ThreeRenderer;
  private time = 0;
  private scenario?: ScenarioEvent[];
  private canvas?: HTMLCanvasElement;

  private _view = { center: Vec3(), zoom: 1, rotation: 0 };

  private overlay?: { start: Vec3; end: Vec3 } | null;

  private speedIndex = 0; // 0 -> x1

  get speed() { return 2 ** this.speedIndex; }

  speedUp() { if (this.speedIndex < 6) this.speedIndex++; }

  slowDown() { if (this.speedIndex > 0) this.speedIndex--; }

  resetSpeed() { this.speedIndex = 0; }

  onRender(handler: (p: RenderPayload) => void) {
    this.bus.on('render', handler);
    return () => this.bus.off('render', handler);
  }

  constructor(canvas?: HTMLCanvasElement) {
    if (canvas) this.setCanvas(canvas);
    this.bus.on('tick', (dt) => this.step(dt));
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new ThreeRenderer(canvas, this.bus);
  }

  get view() { return this._view; }

  setZoom(z: number) { this._view.zoom = z; }

  zoom(factor: number) { this._view.zoom *= factor; }

  rotate(angle: number) { this._view.rotation += angle; }

  setRotation(angle: number) { this._view.rotation = angle; }

  pan(dx: number, dy: number) {
    this._view.center = this._view.center.clone().add(Vec3(dx, dy, 0));
  }

  resetView() { this._view = { center: Vec3(), zoom: 1 }; }

  centerOn(body: ReturnType<PhysicsEngine['addBody']>) {
    this._view.center = body.body.position.clone();
    this._view.zoom = 1;
  }

  worldToScreen(p: Vec3) {
    if (!this.canvas) return p.clone();
    return Vec3(
      (p.x - this._view.center.x) * this._view.zoom + this.canvas.width / 2,
      this.canvas.height / 2 -
        (p.y - this._view.center.y) * this._view.zoom,
      0
    );
  }

  screenToWorld(p: Vec3) {
    if (!this.canvas) return p.clone();
    return Vec3(
      (p.x - this.canvas.width / 2) / this._view.zoom + this._view.center.x,
      (this.canvas.height / 2 - p.y) / this._view.zoom + this._view.center.y,
      0
    );
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
    const scaled = dt * this.speed;
    this.time += scaled;
    if (this.scenario) {
      while (this.scenario.length && this.scenario[0].time <= this.time) {
        const ev = this.scenario.shift()!;
        if (ev.action === 'addBody') {
          this.engine.addBody(ev.position, ev.velocity, ev.data);
        }
      }
    }
    this.engine.step(scaled);
    this.bus.emit('render', {
      bodies: this.engine.bodies,
      throwLine: this.overlay || undefined,
      view: this._view,
    });
  }

  get bodies() { return this.engine.bodies; }

  addBody(pos: Vec3, vel: Vec3, data: BodyData) {
    return this.engine.addBody(pos, vel, data);
  }

  findBody(pos: Vec3) {
    return this.engine.findBody(pos);
  }

  updateBody(b: ReturnType<PhysicsEngine['addBody']>, d: BodyUpdate) {
    this.engine.updateBody(b, d);
    this.bus.emit('bodyUpdate', { body: b, updates: d });
  }

  removeBody(b: ReturnType<PhysicsEngine['addBody']>) {
    this.engine.removeBody(b);
  }

  loadScenario(events: ScenarioEvent[]) {
    this.reset();
    this.scenario = [...events].sort((a,b)=>a.time-b.time);
  }
  
  setOverlay(line: { start: Vec3; end: Vec3 } | null) {
    this.overlay = line;
  }

}
