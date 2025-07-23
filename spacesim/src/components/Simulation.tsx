import { useState, useEffect } from 'preact/hooks';
import CanvasView from './CanvasView';
import BodyList from './BodyList';
import BodyEditor from './BodyEditor';
import BodySpawner from './BodySpawner';
import BodyLabels from './BodyLabels';
import { Simulation, type ScenarioEvent } from '../simulation';
import { Vec2 } from 'planck-js';
import { uniqueName, throwVelocity } from '../utils';

interface Props {
  scenario?: ScenarioEvent[];
  sim?: Simulation; // for tests
}

export default function SimulationComponent({ scenario, sim: ext }: Props) {
  const [sim] = useState(() => ext ?? new Simulation());
  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).sim = sim;
      return () => { delete (window as any).sim; };
    }
  }, [sim]);
  const [running, setRunning] = useState(true);
  const [selected, setSelected] = useState<ReturnType<Simulation['addBody']> | null>(null);
  const [spawnParams, setSpawnParams] = useState({ mass:1, radius:5, color:'#ffffff', label:'body' });
  const [dragStart, setDragStart] = useState<Vec2 | null>(null);
  const [frame, setFrame] = useState(0);
  const [speed, setSpeed] = useState(sim.speed);
  const [time, setTime] = useState(sim.time);

  useEffect(() => {
    const off = sim.onRender(() => {
      setFrame(f => f + 1);
      setTime(sim.time);
    });
    return () => off();
  }, [sim]);

  useEffect(() => {
    if (running) sim.start();
    else sim.stop();
  }, [running, sim]);

  useEffect(() => {
    if (scenario) sim.loadScenario(scenario);
  }, [scenario, sim]);

  const down = (pos: Vec2) => {
    const found = sim.findBody(pos);
    if (found) {
      setSelected(found);
      return;
    }
    setSelected(null);
    setDragStart(pos);
    sim.setOverlay({ start: pos, end: pos });
  };

  const move = (pos: Vec2) => {
    if (!dragStart) return;
    sim.setOverlay({ start: dragStart, end: pos });
  };

  const up = (pos: Vec2) => {
    if (!dragStart) return;
    const velocity = throwVelocity(dragStart, pos);
    const label = uniqueName(spawnParams.label, sim.bodies.map(b=>b.data.label));
    sim.addBody(dragStart, velocity, { ...spawnParams, label });
    setDragStart(null);
    sim.setOverlay(null);
  };

  const toggleRun = () => setRunning(r=>!r);
  const reset = () => { sim.reset(); setSelected(null); setDragStart(null); sim.resetView(); };
  const zoomIn = () => { sim.zoom(1.2); };
  const zoomOut = () => { sim.zoom(1/1.2); };
  const pan = (dx:number, dy:number) => { sim.pan(dx / sim.view.zoom, dy / sim.view.zoom); };
  const center = () => { if (selected) sim.centerOn(selected); else sim.resetView(); };
  const faster = () => { sim.speedUp(); setSpeed(sim.speed); };
  const slower = () => { sim.slowDown(); setSpeed(sim.speed); };
  const resetSpeed = () => { sim.resetSpeed(); setSpeed(sim.speed); };

  return (
    <div className="sim-container" style={{ position:'relative', width:'100%', height:'100%' }}>
      <CanvasView sim={sim} onMouseDown={down} onMouseMove={move} onMouseUp={up} />
      <div className="panel" style={{ position:'absolute', top:'10px', right:'10px', display:'flex', flexDirection:'column', gap:'0.25rem' }}>
        <div style={{ display:'flex', gap:'0.25rem' }}>
          <button onClick={toggleRun}>{running ? 'Pause' : 'Start'}</button>
          <button onClick={reset}>Reset</button>
          <button onClick={center}>Center</button>
        </div>
        <div style={{ display:'flex', gap:'0.25rem', justifyContent:'center' }}>
          <button onClick={slower}>{'<<<'}</button>
          <button onClick={resetSpeed}>{`x${speed}`}</button>
          <button onClick={faster}>{'>>>'}</button>
        </div>
        <div style={{ display:'flex', gap:'0.25rem', justifyContent:'center' }}>
          <button onClick={zoomIn}>+</button>
          <button onClick={zoomOut}>-</button>
        </div>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <button onClick={()=>pan(0,-20)}>↑</button>
        </div>
        <div style={{ display:'flex', gap:'0.25rem', justifyContent:'center' }}>
          <button onClick={()=>pan(-20,0)}>←</button>
          <button onClick={()=>pan(20,0)}>→</button>
        </div>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <button onClick={()=>pan(0,20)}>↓</button>
        </div>
        <div className="sim-time" style={{marginTop:'0.25rem'}}>Time {time.toFixed(1)}s</div>
      </div>
      <BodySpawner sim={sim} disabled={!!selected || !!dragStart} params={spawnParams} onChange={setSpawnParams} />
      <BodyEditor sim={sim} body={selected} onDeselect={()=>setSelected(null)} frame={frame} />
      <BodyList sim={sim} selected={selected} onSelect={b=>setSelected(b)} />
      <BodyLabels sim={sim} frame={frame} />
    </div>
  );
}
