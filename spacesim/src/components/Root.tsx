import { useState } from 'preact/hooks';
import CanvasView from './CanvasView';
import BodyList from './BodyList';
import BodyEditor from './BodyEditor';
import BodySpawner from './BodySpawner';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';
import { solarSystem } from '../scenarios/solarSystem';
import { uniqueName } from '../utils';
import SimulationView from './Simulation';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'scenario'>('sandbox');

  return (
    <div style={{ position:'relative', width:'100vw', height:'100vh' }}>
      <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'0.5rem', zIndex:1 }}>
        <button onClick={() => setTab('sandbox')}>Sandbox</button>
        <button onClick={() => setTab('scenario')}>Scenario</button>
      </div>
      {tab === 'sandbox' ? <SimulationView /> : <div style={{color:'#fff'}}>Scenario coming soon</div>}
    </div>
  );
}
