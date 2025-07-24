import { describe, it, expect } from 'vitest';
import { PhysicsEngine3D } from './physics';
import { Vector3 } from 'three';

describe('PhysicsEngine3D', () => {
  it('attracts bodies toward each other', () => {
    const eng = new PhysicsEngine3D();
    eng.addBody(new Vector3(0,0,0), new Vector3(), { mass:1, radius:1, color:'r', label:'' });
    eng.addBody(new Vector3(10,0,0), new Vector3(), { mass:1, radius:1, color:'b', label:'' });
    eng.step(1/60);
    const [a,b] = eng.bodies;
    expect(a.vel.x).toBeGreaterThan(0);
    expect(b.vel.x).toBeLessThan(0);
  });

  it('clears bodies on reset', () => {
    const eng = new PhysicsEngine3D();
    eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'r', label:'' });
    eng.reset();
    expect(eng.bodies.length).toBe(0);
  });

  it('updates body mass', () => {
    const eng = new PhysicsEngine3D();
    const body = eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'r', label:'' });
    eng.updateBody(body, { mass:2 });
    expect(body.data.mass).toBe(2);
  });

  it('updates body radius', () => {
    const eng = new PhysicsEngine3D();
    const body = eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'r', label:'' });
    eng.updateBody(body, { radius:2 });
    expect(body.data.radius).toBe(2);
  });

  it('finds a body by position', () => {
    const eng = new PhysicsEngine3D();
    eng.addBody(new Vector3(5,5,0), new Vector3(), { mass:1, radius:2, color:'r', label:'' });
    const found = eng.findBody(new Vector3(6,5,0));
    expect(found).toBeDefined();
  });

  it('returns undefined when no body at position', () => {
    const eng = new PhysicsEngine3D();
    eng.addBody(new Vector3(5,5,0), new Vector3(), { mass:1, radius:2, color:'r', label:'' });
    const found = eng.findBody(new Vector3(50,50,0));
    expect(found).toBeUndefined();
  });

  it('merges smaller body on collision with massive one', () => {
    const eng = new PhysicsEngine3D();
    const big = eng.addBody(new Vector3(0,0,0), new Vector3(), { mass:3, radius:1, color:'r', label:'' });
    const small = eng.addBody(new Vector3(0.5,0,0), new Vector3(), { mass:1, radius:1, color:'b', label:'' });
    eng.step(0);
    expect(eng.bodies.length).toBe(1);
    expect(eng.bodies[0].data.mass).toBeCloseTo(4);
  });

  it('bounces similar masses', () => {
    const eng = new PhysicsEngine3D();
    const a = eng.addBody(new Vector3(-0.5,0,0), new Vector3(1,0,0), { mass:1, radius:1, color:'r', label:'' });
    const b = eng.addBody(new Vector3(0.5,0,0), new Vector3(-1,0,0), { mass:1, radius:1, color:'b', label:'' });
    eng.step(0);
    expect(a.vel.x).toBeLessThan(0);
    expect(b.vel.x).toBeGreaterThan(0);
  });

  it('removes bodies correctly', () => {
    const eng = new PhysicsEngine3D();
    const body = eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'r', label:'a' });
    eng.removeBody(body);
    expect(eng.bodies.length).toBe(0);
  });

  it('updates label and color', () => {
    const eng = new PhysicsEngine3D();
    const body = eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'red', label:'a' });
    eng.updateBody(body, { label:'b', color:'blue' });
    expect(body.data.label).toBe('b');
    expect(body.data.color).toBe('blue');
  });

  it('updates body position', () => {
    const eng = new PhysicsEngine3D();
    const body = eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'r', label:'a' });
    eng.updateBody(body, { position:new Vector3(5,6,7) });
    expect(body.pos.x).toBeCloseTo(5);
    expect(body.pos.y).toBeCloseTo(6);
    expect(body.pos.z).toBeCloseTo(7);
  });

  it('updates body velocity', () => {
    const eng = new PhysicsEngine3D();
    const body = eng.addBody(new Vector3(), new Vector3(), { mass:1, radius:1, color:'r', label:'a' });
    eng.updateBody(body, { velocity:new Vector3(3,4,5) });
    expect(body.vel.x).toBeCloseTo(3);
    expect(body.vel.y).toBeCloseTo(4);
    expect(body.vel.z).toBeCloseTo(5);
  });
});
