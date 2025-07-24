import { useState, useEffect } from 'preact/hooks';
import CanvasView from './CanvasView';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';

interface Props { sim?: Simulation }

export default function NavigationView({ sim: ext }: Props) {
  const [sim] = useState(() => ext ?? new Simulation());
  const [drag, setDrag] = useState<Vec2 | null>(null);

  useEffect(() => { sim.start(); return () => sim.stop(); }, [sim]);

  const down = (pos: Vec2) => { setDrag(pos); };
  const move = (pos: Vec2) => {
    if (!drag) return;
    const dx = pos.x - drag.x;
    sim.rotate(dx * 0.005);
    setDrag(pos);
  };
  const up = () => setDrag(null);

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <CanvasView sim={sim} onMouseDown={down} onMouseMove={move} onMouseUp={up} />
    </div>
  );
}
