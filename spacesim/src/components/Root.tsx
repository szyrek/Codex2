import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import DocsView from './DocsView';
import ShipView from './ShipView';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'docs' | 'shipview'>('sandbox');

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
          <button onClick={() => setTab('shipview')}>Shipview</button>
          <button onClick={() => setTab('docs')}>Docs</button>
        </div>
      </header>
      <main className="main-container">
        {tab === 'sandbox' ? (
          <SimulationView />
        ) : tab === 'shipview' ? (
          <ShipView />
        ) : (
          <DocsView />
        )}
      </main>
      <footer className="status-footer">Ready</footer>
    </div>
  );
}
