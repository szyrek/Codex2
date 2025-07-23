import { useState, useEffect } from 'preact/hooks';
import CanvasView from './CanvasView';
import BodyList from './BodyList';
import BodyEditor from './BodyEditor';
import BodySpawner from './BodySpawner';
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
    (window as any).sim = sim;
  }, [sim]);
  const [running, setRunning] = useState(true);
  const [selected, setSelected] = useState<ReturnType<Simulation['addBody']> | null>(null);
  const [spawnParams, setSpawnParams] = useState({ mass:1, radius:5, color:'#ffffff', label:'body' });
  const [dragStart, setDragStart] = useState<Vec2 | null>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const off = sim.onRender(() => setFrame(f => f + 1));
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
  const reset = () => { sim.reset(); setSelected(null); setDragStart(null); };

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <CanvasView sim={sim} onMouseDown={down} onMouseMove={move} onMouseUp={up} />
      <div style={{ position:'absolute', top:'10px', right:'10px', display:'flex', gap:'0.5rem' }}>
        <button onClick={toggleRun}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={reset}>Reset</button>
      </div>
      <BodySpawner sim={sim} disabled={!!selected || !!dragStart} params={spawnParams} onChange={setSpawnParams} />
      <BodyEditor sim={sim} body={selected} onDeselect={()=>setSelected(null)} frame={frame} />
      <BodyList sim={sim} selected={selected} onSelect={b=>setSelected(b)} />
    </div>
  );
}
