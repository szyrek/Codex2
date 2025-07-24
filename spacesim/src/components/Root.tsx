import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import ScenarioView from './ScenarioView';
import DocsView from './DocsView';
import ShipView from './ShipView';

export default function Root() {
  const [tab, setTab] = useState<'sandbox' | 'scenario' | 'docs' | 'shipview'>('sandbox');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-root" style={{display:'flex', flexDirection:'column'}}>
      <header className="hud-bar">
        <img
          src={`${import.meta.env.BASE_URL}images/logo.png`}
          alt="Spacesim logo"
          className="app-logo"
        />
      </header>
      <main className="main-container">
        {tab === 'sandbox' ? (
          <SimulationView />
        ) : tab === 'scenario' ? (
          <ScenarioView />
        ) : tab === 'shipview' ? (
          <ShipView />
        ) : (
          <DocsView />
        )}
      </main>
      <footer className="status-footer">Ready</footer>
      <div className={`hud-menu${menuOpen ? ' open' : ''}`}>
        <button className="menu-toggle" onClick={() => setMenuOpen(o => !o)}>
          Utilities
        </button>
        <div className="menu-items">
          <button onClick={() => { setTab('sandbox'); setMenuOpen(false); }}>Sandbox</button>
          <button onClick={() => { setTab('scenario'); setMenuOpen(false); }}>Scenario</button>
          <button onClick={() => { setTab('shipview'); setMenuOpen(false); }}>Shipview</button>
          <button onClick={() => { setTab('docs'); setMenuOpen(false); }}>Docs</button>
        </div>
      </div>
    </div>
  );
}
