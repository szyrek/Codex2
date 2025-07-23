import { Simulation } from '../simulation';

interface Props {
  sim: Simulation;
  selected?: ReturnType<Simulation['addBody']> | null;
  onSelect: (body: ReturnType<Simulation['addBody']>) => void;
}

export default function BodyList({ sim, selected, onSelect }: Props) {
  return (
    <ul style={{ position: 'absolute', right: '10px', bottom: '10px', listStyle: 'none', padding: '0.5rem', background: '#2228', color: '#eee' }}>
      {sim.bodies.map((b) => (
        <li key={b.data.label} style={{ cursor: 'pointer', padding: '2px 4px', background: selected === b ? '#444' : 'transparent' }} onClick={() => onSelect(b)}>{b.data.label}</li>
      ))}
    </ul>
  );
}
