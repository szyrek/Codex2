import { describe, it, expect, vi } from 'vitest';
import { ThreeRenderer } from './renderers/threeRenderer';
import { createEventBus } from './core/eventBus';
import { PhysicsEngine } from './physics';
import { Vec3 } from './vector';
import { throwVelocity } from './utils';

vi.mock('three', () => {
  class Scene { objects:any[]=[]; add(o:any){this.objects.push(o);} remove(o:any){this.objects=this.objects.filter(x=>x!==o);} }
  class WebGLRenderer { setSize(){} render(){} }
  class OrthographicCamera { position={x:0,y:0,z:0}; rotation={z:0}; zoom=1; constructor(){} updateProjectionMatrix(){} }
  class SphereGeometry { constructor(public r:number,_s?:number,_s2?:number){} dispose(){} }
  class MeshBasicMaterial { color:string; constructor(public opts:any){this.color=opts.color;} dispose(){} }
  class LineBasicMaterial { color:string; constructor(public opts:any){this.color=opts.color;} dispose(){} }
  class LineDashedMaterial { color:string; dashSize:number; gapSize:number; constructor(public opts:any){ this.color=opts.color; this.dashSize=opts.dashSize; this.gapSize=opts.gapSize; } dispose(){} }
  class BufferGeometry { points:any[]=[]; setFromPoints(p:any[]){ this.points=p; return this; } dispose(){} }
  class Mesh { position={x:0,y:0,z:0,set(x:number,y:number,z:number){this.x=x;this.y=y;this.z=z;}}; constructor(public g:any,public m:any){} }
  class Line { geometry:any; material:any; constructor(g:any,m:any){ this.geometry=g; this.material=m; } computeLineDistances(){} }
  class Vector3 {
    constructor(public x:number,public y:number,public z:number){}
    clone(){ return new Vector3(this.x,this.y,this.z); }
    add(v:any){ this.x+=v.x; this.y+=v.y; this.z+=v.z; return this; }
    sub(v:any){ this.x-=v.x; this.y-=v.y; this.z-=v.z; return this; }
    multiplyScalar(s:number){ this.x*=s; this.y*=s; this.z*=s; return this; }
    lengthSq(){ return this.x*this.x + this.y*this.y + this.z*this.z; }
    length(){ return Math.sqrt(this.lengthSq()); }
    distanceTo(v:any){ return this.clone().sub(v).length(); }
    dot(v:any){ return this.x*v.x + this.y*v.y + this.z*v.z; }
  }
  class AmbientLight { constructor(public color:any, public intensity:any){} }
  class PointLight { position={x:0,y:0,z:0,set(x:number,y:number,z:number){this.x=x;this.y=y;this.z=z;}}; constructor(public color:any, public intensity:any){} }
  return { Scene, WebGLRenderer, OrthographicCamera, SphereGeometry, MeshBasicMaterial, Mesh, LineBasicMaterial, LineDashedMaterial, BufferGeometry, Line, Vector3, AmbientLight, PointLight };
});

describe('ThreeRenderer', () => {
  it('positions meshes at body coordinates', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    const body = engine.addBody(Vec3(5, 6, 0), Vec3(), { mass:1, radius:1, color:'#fff', label:'b' });
    bus.emit('render', { bodies: engine.bodies });
    const mesh = (renderer as any).bodyMeshes.get(body.body);
    expect(mesh.position.x).toBeCloseTo(5);
    expect(mesh.position.y).toBeCloseTo(6);
  });

  it('positions light at heaviest body', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec3(1,1,0), Vec3(), { mass:1, radius:1, color:'#fff', label:'a' });
    const sun = engine.addBody(Vec3(4,5,0), Vec3(), { mass:10, radius:2, color:'yellow', label:'s' });
    bus.emit('render', { bodies: engine.bodies });
    const light = (renderer as any).sunLight;
    expect(light.position.x).toBeCloseTo(4);
    expect(light.position.y).toBeCloseTo(5);
  });

  it('draws orbit line in body color when stable', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec3(0, 0, 0), Vec3(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    const vel = throwVelocity(Vec3(10,0,0), Vec3(10,50,0));
    const satellite = engine.addBody(Vec3(10, 0, 0), vel, { mass: 1, radius: 1, color: 'white', label: 's' });
    bus.emit('render', { bodies: engine.bodies });
    const line = (renderer as any).orbitLines.get(satellite.body);
    expect(line.material.color).toBe('white');
  });

  it('colors drag line blue on escape trajectory', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec3(0,0,0), Vec3(), { mass: 1, radius: 1, color: 'yellow', label: 'c' });
    bus.emit('render', { bodies: engine.bodies, throwLine: { start: Vec3(10,0,0), end: Vec3(110,0,0) } });
    const drag = (renderer as any).dragLine;
    expect(drag.material.color).toBe('blue');
  });

  it('clears orbit lines when no bodies', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    const engine = new PhysicsEngine();
    engine.addBody(Vec3(0, 0, 0), Vec3(), { mass:1, radius:1, color:'yellow', label:'c' });
    const vel = throwVelocity(Vec3(10,0,0), Vec3(10,50,0));
    engine.addBody(Vec3(10,0,0), vel, { mass:1, radius:1, color:'white', label:'s' });
    bus.emit('render', { bodies: engine.bodies });
    expect((renderer as any).orbitLines.size).toBe(1);
    bus.emit('render', { bodies: [] });
    expect((renderer as any).orbitLines.size).toBe(0);
  });

  it('applies view rotation to the camera', () => {
    const canvas = { width: 200, height: 200 } as HTMLCanvasElement;
    const bus = createEventBus<any>();
    const renderer = new ThreeRenderer(canvas, bus);
    bus.emit('render', { bodies: [], view: { center: Vec3(), zoom: 1, rotation: Math.PI / 4 } });
    const cam = (renderer as any).camera;
    expect(cam.rotation.z).toBeCloseTo(Math.PI / 4);
  });
});
