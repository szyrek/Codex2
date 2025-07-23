import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import ScenarioView from './ScenarioView';
import DocsView from './DocsView';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'scenario' | 'docs'>('sandbox');

  return (
    <div style={{ position:'relative', width:'100vw', height:'100vh' }}>
      <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'0.5rem', zIndex:1 }}>
        <button onClick={() => setTab('sandbox')}>Sandbox</button>
        <button onClick={() => setTab('scenario')}>Scenario</button>
        <button onClick={() => setTab('docs')}>Docs</button>
      </div>
      {tab === 'sandbox' ? <SimulationView /> : tab === 'scenario' ? <ScenarioView /> : <DocsView />}
    </div>
  );
}
