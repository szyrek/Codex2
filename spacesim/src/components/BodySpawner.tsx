import { Simulation } from '../simulation';

interface Params { mass: number; radius: number; color: string; label: string }
interface Props {
  sim: Simulation; // kept for future use
  disabled: boolean;
  params: Params;
  onChange: (p: Params) => void;
}

export default function BodySpawner({ sim, disabled, params, onChange }: Props) {
  const { mass, radius, color, label } = params;

  if (disabled) return null;

  return (
    <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '0.5rem' }}>
      <label>Name <input value={label} onInput={e=>onChange({ ...params, label: (e.target as HTMLInputElement).value })} /></label>
      <label>Mass <input type="number" step="0.1" value={mass} onInput={e=>onChange({ ...params, mass: parseFloat((e.target as HTMLInputElement).value) })} /></label>
      <label>Radius <input type="number" step="1" value={radius} onInput={e=>onChange({ ...params, radius: parseFloat((e.target as HTMLInputElement).value) })} /></label>
      <label>Color <input type="color" value={color} onInput={e=>onChange({ ...params, color: (e.target as HTMLInputElement).value })} /></label>
      <span>Click canvas to spawn</span>
    </div>
  );
}
