import { useEffect, useRef } from 'preact/hooks';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';

interface Props {
  sim: Simulation;
  onClick?: (pos: Vec2) => void;
}

export default function CanvasView({ sim, onClick }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    sim.setCanvas(ref.current);
    sim.start();
    return () => sim.stop();
  }, [sim]);
  const handleClick = (e: MouseEvent) => {
    if (!onClick) return;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    onClick(Vec2(e.clientX - rect.left, e.clientY - rect.top));
  };
  return <canvas ref={ref} onClick={handleClick as any} style={{ width: '100%', height: '100%' }} />;
}
