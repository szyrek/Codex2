import { Simulation } from '../simulation';

interface Props {
  sim: Simulation;
  onSelect: (body: ReturnType<Simulation['addBody']>) => void;
}

export default function BodyList({ sim, onSelect }: Props) {
  return (
    <ul style={{ position: 'absolute', right: '10px', bottom: '10px', listStyle: 'none', padding: '0.5rem', background: '#2228', color: '#eee' }}>
      {sim.bodies.map((b) => (
        <li key={b.data.label} style={{ cursor: 'pointer', padding: '2px 4px' }} onClick={() => onSelect(b)}>{b.data.label}</li>
      ))}
    </ul>
  );
}
