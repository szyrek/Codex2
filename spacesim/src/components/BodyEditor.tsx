import { useState, useEffect } from 'preact/hooks';
import { Simulation } from '../simulation';
import type { BodyData } from '../physics';

interface Props {
  sim: Simulation;
  body: ReturnType<Simulation['addBody']> | null;
  onDeselect: () => void;
}

export default function BodyEditor({ sim, body, onDeselect }: Props) {
  const [state, setState] = useState<BodyData | null>(body?.data || null);
  useEffect(() => {
    setState(body?.data || null);
  }, [body]);
  if (!body) return null;
  const apply = () => {
    sim.updateBody(body, state!);
  };
  const remove = () => {
    sim.removeBody(body);
    onDeselect();
  };
  return (
    <div style={{ position: 'absolute', top: '140px', left: '10px', background: '#2228', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>Name <input value={state!.label} onInput={(e) => setState({ ...state!, label: (e.target as HTMLInputElement).value })} /></label>
      <label>Mass <input type="number" step="0.1" value={state!.mass} onInput={(e) => setState({ ...state!, mass: parseFloat((e.target as HTMLInputElement).value) })} /></label>
      <label>Radius <input type="number" step="1" value={state!.radius} onInput={(e) => setState({ ...state!, radius: parseFloat((e.target as HTMLInputElement).value) })} /></label>
      <label>Color <input type="color" value={state!.color} onInput={(e) => setState({ ...state!, color: (e.target as HTMLInputElement).value })} /></label>
      <button onClick={apply}>Apply</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
