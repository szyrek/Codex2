import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import ScenarioView from './ScenarioView';
import DocsView from './DocsView';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'scenario' | 'docs'>('sandbox');

  return (
    <div className="app-root" style={{display:'flex', flexDirection:'column'}}>
      <header className="hud-bar">
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="Spacesim logo"
          className="app-logo"
        />
        <div className="hud-buttons">
          <button onClick={() => setTab('sandbox')}>Sandbox</button>
          <button onClick={() => setTab('scenario')}>Scenario</button>
          <button onClick={() => setTab('docs')}>Docs</button>
        </div>
      </header>
      <main className="main-container">
        {tab === 'sandbox' ? <SimulationView /> : tab === 'scenario' ? <ScenarioView /> : <DocsView />}
      </main>
      <footer className="status-footer">Ready</footer>
    </div>
  );
}
