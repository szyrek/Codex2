import { describe, it, expect, vi } from 'vitest';
import { ThreeRenderer } from './renderers/threeRenderer';
import { createEventBus } from './core/eventBus';
import { PhysicsEngine } from './physics';
import Vec2 from './vec2';
import { throwVelocity } from './utils';

vi.mock('three', () => {
  class Scene { objects:any[]=[]; add(o:any){this.objects.push(o);} remove(o:any){this.objects=this.objects.filter(x=>x!==o);} }
  class WebGLRenderer { setSize(){} render(){} }
  class OrthographicCamera { position={x:0,y:0,z:0}; zoom=1; constructor(){} updateProjectionMatrix(){} }
  class SphereGeometry { constructor(public r:number,_s?:number,_s2?:number){} dispose(){} }
  class MeshBasicMaterial { color:string; constructor(public opts:any){this.color=opts.color;} dispose(){} }
  class LineBasicMaterial { color:string; constructor(public opts:any){this.color=opts.color;} dispose(){} }
  class LineDashedMaterial { color:string; dashSize:number; gapSize:number; constructor(public opts:any){ this.color=opts.color; this.dashSize=opts.dashSize; this.gapSize=opts.gapSize; } dispose(){} }
  class BufferGeometry { points:any[]=[]; setFromPoints(p:any[]){ this.points=p; return this; } dispose(){} }
  class Mesh { position={x:0,y:0,z:0,set(x:number,y:number,z:number){this.x=x;this.y=y;this.z=z;}}; constructor(public g:any,public m:any){} }
  class Line { geometry:any; material:any; constructor(g:any,m:any){ this.geometry=g; this.material=m; } computeLineDistances(){} }
  class Vector3 { constructor(public x:number,public y:number,public z:number){} }
  return { Scene, WebGLRenderer, OrthographicCamera, SphereGeometry, MeshBasicMaterial, Mesh, LineBasicMaterial, LineDashedMaterial, BufferGeometry, Line, Vector3 };
});

describe('ThreeRenderer', () => {
  it('positions meshes at body coordinates', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    const body = engine.addBody(Vec2(5, 6), Vec2(), { mass:1, radius:1, color:'#fff', label:'b' });
    bus.emit('render', { bodies: engine.bodies });
    const mesh = (renderer as any).bodyMeshes.get(body.body);
    expect(mesh.position.x).toBeCloseTo(5);
    expect(mesh.position.y).toBeCloseTo(6);
  });

  it('draws orbit line in body color when stable', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0, 0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const vel = throwVelocity(Vec2(10,0), Vec2(10,50));
    const satellite = engine.addBody(Vec2(10, 0), vel, { mass: 1, radius: 1, color: 'white', label: 's' });
    bus.emit('render', { bodies: engine.bodies });
    const line = (renderer as any).orbitLines.get(satellite.body);
    expect(line.material.color).toBe('white');
  });

  it('colors drag line blue on escape trajectory', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0,0), Vec2(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    bus.emit('render', { bodies: engine.bodies, throwLine: { start: Vec2(10,0), end: Vec2(110,0) } });
    const drag = (renderer as any).dragLine;
    expect(drag.material.color).toBe('blue');
  });

  it('clears orbit lines when no bodies', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec2(0, 0), Vec2(), { mass:1, radius:1, color:'yellow', label:'c' });
    const vel = throwVelocity(Vec2(10,0), Vec2(10,50));
    engine.addBody(Vec2(10,0), vel, { mass:1, radius:1, color:'white', label:'s' });
    bus.emit('render', { bodies: engine.bodies });
    expect((renderer as any).orbitLines.size).toBe(1);
    bus.emit('render', { bodies: [] });
    expect((renderer as any).orbitLines.size).toBe(0);
  });
});
