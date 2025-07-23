import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import ScenarioView from './ScenarioView';
import DocsView from './DocsView';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'scenario' | 'docs'>('sandbox');

  return (
    <div className="app-root">
      <div className="hud-buttons">
        <button onClick={() => setTab('sandbox')}>Sandbox</button>
        <button onClick={() => setTab('scenario')}>Scenario</button>
        <button onClick={() => setTab('docs')}>Docs</button>
      </div>
      {tab === 'sandbox' ? <SimulationView /> : tab === 'scenario' ? <ScenarioView /> : <DocsView />}
    </div>
  );
}
