import { useState } from 'preact/hooks';
import CanvasView from './CanvasView';
import BodyList from './BodyList';
import BodyEditor from './BodyEditor';
import BodySpawner from './BodySpawner';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';
import { solarSystem } from '../scenarios/solarSystem';
import { uniqueName } from '../utils';

export default function Root() {
  const [sim] = useState(() => new Simulation());
  const [selected, setSelected] = useState<ReturnType<Simulation['addBody']> | null>(null);
  const [tab, setTab] = useState<'sandbox' | 'scenario'>('sandbox');
  const [spawnParams, setSpawnParams] = useState({ mass:1, radius:5, color:'#ffffff', label:'body' });

  const clickCanvas = (pos: Vec2) => {
    if (selected) return;
    const label = uniqueName(spawnParams.label, sim.bodies.map(b => b.data.label));
    sim.addBody(pos, Vec2(), { ...spawnParams, label });
  };

  const loadScenario = () => {
    sim.loadScenario(solarSystem);
  };

  return (
    <div>
      <div style={{ display:'flex', gap:'1rem' }}>
        <button onClick={() => setTab('sandbox')}>Sandbox</button>
        <button onClick={() => setTab('scenario')}>Scenario</button>
      </div>
      {tab === 'scenario' && <button onClick={loadScenario}>Load Solar System</button>}
      <CanvasView sim={sim} onClick={clickCanvas} />
      <BodyList sim={sim} onSelect={(b)=>setSelected(b)} />
      <BodySpawner sim={sim} disabled={!!selected} params={spawnParams} onChange={setSpawnParams} />
      <BodyEditor sim={sim} body={selected} onDeselect={() => setSelected(null)} />
    </div>
  );
}
