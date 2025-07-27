import { useState, useEffect } from 'preact/hooks';
import CanvasView from './CanvasView';
import { Simulation } from '../simulation';
import { Vec3 } from '../vector';

interface Props { sim?: Simulation }

export default function NavigationView({ sim: ext }: Props) {
  const [sim] = useState(() => ext ?? new Simulation());
  const [drag, setDrag] = useState<Vec3 | null>(null);

  useEffect(() => { sim.start(); return () => sim.stop(); }, [sim]);

  const down = (pos: Vec3) => { setDrag(pos); };
  const move = (pos: Vec3) => {
    if (!drag) return;
    const dx = pos.x - drag.x;
    sim.rotate(dx * 0.005);
    setDrag(pos);
  };
  const up = () => setDrag(null);

  const pan = (dx: number, dy: number) => {
    sim.pan(dx / sim.view.zoom, dy / sim.view.zoom);
  };

  return (
    <div style={{ position:'relative', width:'100%', height:'100%' }}>
      <CanvasView sim={sim} onMouseDown={down} onMouseMove={move} onMouseUp={up} />
      <div className="edge-buttons">
        <button className="btn-up" onClick={() => pan(0, -20)}>↑</button>
        <button className="btn-left" onClick={() => pan(-20, 0)}>←</button>
        <button className="btn-right" onClick={() => pan(20, 0)}>→</button>
        <button className="btn-down" onClick={() => pan(0, 20)}>↓</button>
      </div>
    </div>
  );
}
