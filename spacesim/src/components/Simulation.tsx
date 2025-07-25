import { useState, useEffect } from 'preact/hooks';
import CanvasView from './CanvasView';
import BodyList from './BodyList';
import BodyEditor from './BodyEditor';
import BodySpawner from './BodySpawner';
import BodyLabels from './BodyLabels';
import { Simulation, type ScenarioEvent } from '../simulation';
import ScenarioChooser from './ScenarioChooser';
import { Vec3 } from '../vector';
import { uniqueName, throwVelocity, nextSpawnParams } from '../utils';

const defaultSpawn = { mass: 100, radius: 50, color: '#ffff00', label: 'Sun' };

interface Props {
  scenario?: ScenarioEvent[];
  sim?: Simulation; // for tests
  showSpawner?: boolean;
}

export default function SimulationComponent({ scenario, sim: ext, showSpawner = true }: Props) {
  const [sim] = useState(() => ext ?? new Simulation());
  useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).sim = sim;
      return () => { delete (window as any).sim; };
    }
  }, [sim]);
  const [running, setRunning] = useState(true);
  const [selected, setSelected] = useState<ReturnType<Simulation['addBody']> | null>(null);
  const [spawnParams, setSpawnParams] = useState({ ...defaultSpawn });
  const [dragStart, setDragStart] = useState<Vec3 | null>(null);
  const [frame, setFrame] = useState(0);
  const [speed, setSpeed] = useState(sim.speed);
  const [time, setTime] = useState(sim.time);
  const [showScenario, setShowScenario] = useState(false);

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

  const down = (pos: Vec3) => {
    const found = sim.findBody(pos);
    if (found) {
      setSelected(found);
      return;
    }
    setSelected(null);
    setDragStart(pos);
    sim.setOverlay({ start: pos, end: pos });
  };

  const move = (pos: Vec3) => {
    if (!dragStart) return;
    sim.setOverlay({ start: dragStart, end: pos });
  };

  const up = (pos: Vec3) => {
    if (!dragStart) return;
    const velocity = throwVelocity(dragStart, pos, sim.view.zoom);
    const label = uniqueName(spawnParams.label, sim.bodies.map(b=>b.data.label));
    sim.addBody(dragStart, velocity, { ...spawnParams, label });
    setDragStart(null);
    sim.setOverlay(null);
    setSpawnParams(nextSpawnParams(spawnParams));
  };

  const toggleRun = () => setRunning(r=>!r);
  const reset = () => {
    sim.reset();
    setSelected(null);
    setDragStart(null);
    sim.resetView();
    setSpawnParams({ ...defaultSpawn });
  };
  const zoomIn = () => { sim.zoom(1.2); };
  const zoomOut = () => { sim.zoom(1/1.2); };
  const pan = (dx:number, dy:number) => { sim.pan(dx / sim.view.zoom, dy / sim.view.zoom); };
  const center = () => { if (selected) sim.centerOn(selected); else sim.resetView(); };
  const faster = () => { sim.speedUp(); setSpeed(sim.speed); };
  const slower = () => { sim.slowDown(); setSpeed(sim.speed); };
  const resetSpeed = () => { sim.resetSpeed(); setSpeed(sim.speed); };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') { e.preventDefault(); pan(0, -20); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); pan(0, 20); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); pan(-20, 0); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); pan(20, 0); }
    };
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const factor = Math.pow(1.1, -e.deltaY / 100);
      sim.zoom(factor);
    };
    window.addEventListener('keydown', handleKey, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [sim]);

  return (
    <div className="sim-container" style={{ position:'relative', width:'100%', height:'100%' }}>
      <CanvasView sim={sim} onMouseDown={down} onMouseMove={move} onMouseUp={up} />
      <div className="panel" style={{ position:'absolute', top:'10px', right:'10px', display:'flex', flexDirection:'column', gap:'0.25rem' }}>
        <div style={{ display:'flex', gap:'0.25rem' }}>
          <button onClick={toggleRun}>{running ? 'Pause' : 'Start'}</button>
          <button onClick={reset}>Reset</button>
          <button onClick={center}>Center</button>
          <button onClick={() => setShowScenario(s => !s)}>Scenario</button>
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
      {showSpawner && (
        <BodySpawner
          sim={sim}
          disabled={!!selected || !!dragStart}
          params={spawnParams}
          onChange={setSpawnParams}
        />
      )}
      <ScenarioChooser sim={sim} visible={showScenario} />
      <BodyEditor sim={sim} body={selected} onDeselect={()=>setSelected(null)} frame={frame} />
      <BodyList sim={sim} selected={selected} onSelect={b=>setSelected(b)} />
      <BodyLabels sim={sim} frame={frame} />
    </div>
  );
}
