import { useState } from 'preact/hooks';

export interface Config {
  shipName: string;
  volume: number;
  graphics: 'low' | 'medium' | 'high';
  autopilot: boolean;
}

const defaults: Config = {
  shipName: 'TestShip-01',
  volume: 75,
  graphics: 'high',
  autopilot: false,
};

export default function ConfigView() {
  const [config, setConfig] = useState<Config>(defaults);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: '#2228', padding: '1rem', border: '1px solid #555', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#fff' }}>
        <label>Ship Name <input value={config.shipName} onInput={e => setConfig({ ...config, shipName: (e.target as HTMLInputElement).value })} /></label>
        <label>Volume <input type="range" min="0" max="100" value={config.volume} onInput={e => setConfig({ ...config, volume: parseInt((e.target as HTMLInputElement).value) })} /></label>
        <label>Graphics
          <select value={config.graphics} onChange={e => setConfig({ ...config, graphics: (e.target as HTMLSelectElement).value as Config['graphics'] })}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <label><input type="checkbox" checked={config.autopilot} onChange={e => setConfig({ ...config, autopilot: (e.target as HTMLInputElement).checked })} /> Autopilot</label>
      </div>
    </div>
  );
}
