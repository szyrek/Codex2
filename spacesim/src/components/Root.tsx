import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import ScenarioView from './ScenarioView';
import DocsView from './DocsView';
import ShipView from './ShipView';
import ConfigView, { ShipConfig } from './ConfigView';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'scenario' | 'docs' | 'shipview' | 'config'>('sandbox');
  const [config, setConfig] = useState<ShipConfig>({ flipRotation: false, midHeight: 70 });

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
          <button onClick={() => setTab('shipview')}>Shipview</button>
          <button onClick={() => setTab('config')}>Config</button>
          <button onClick={() => setTab('docs')}>Docs</button>
        </div>
      </header>
      <main className="main-container">
        {tab === 'sandbox' ? (
          <SimulationView />
        ) : tab === 'scenario' ? (
          <ScenarioView />
        ) : tab === 'shipview' ? (
          <ShipView config={config} />
        ) : tab === 'config' ? (
          <ConfigView config={config} onChange={setConfig} />
        ) : (
          <DocsView />
        )}
      </main>
      <footer className="status-footer">Ready</footer>
    </div>
  );
}
