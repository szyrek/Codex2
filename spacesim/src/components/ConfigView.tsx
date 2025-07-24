import { JSX } from 'preact';

export interface ShipConfig {
  flipRotation: boolean;
  midHeight: number;
}

interface Props {
  config: ShipConfig;
  onChange: (c: ShipConfig) => void;
}

export default function ConfigView({ config, onChange }: Props) {
  const setFlip = (e: Event) => {
    onChange({ ...config, flipRotation: (e.target as HTMLInputElement).checked });
  };
  const setHeight = (e: Event) => {
    onChange({ ...config, midHeight: parseFloat((e.target as HTMLInputElement).value) });
  };
  return (
    <div className="panel" style={{ position: 'absolute', top: '60px', left: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>
        Flip rotation
        <input type="checkbox" checked={config.flipRotation} onChange={setFlip} />
      </label>
      <label>
        Console height
        <input type="number" value={config.midHeight} onInput={setHeight} style={{ width: '4rem' }} />
      </label>
    </div>
  );
}
