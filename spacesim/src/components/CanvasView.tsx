import { useEffect, useRef } from 'preact/hooks';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';

interface Props {
  sim: Simulation;
  onClick?: (pos: Vec2) => void;
}

export default function CanvasView({ sim, onClick, onMouseDown, onMouseMove, onMouseUp }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    sim.setCanvas(canvas);
  }, [sim]);
  const toVec = (e: MouseEvent) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const p = Vec2(
      (e.clientX - rect.left) * dpr,
      (e.clientY - rect.top) * dpr
    );
    return sim.screenToWorld(p);
  };
  const handleClick = (e: MouseEvent) => {
    if (onClick) onClick(toVec(e));
  };
  const handleDown = (e: MouseEvent) => onMouseDown?.(toVec(e));
  const handleMove = (e: MouseEvent) => onMouseMove?.(toVec(e));
  const handleUp = (e: MouseEvent) => onMouseUp?.(toVec(e));
  return (
    <canvas
      ref={ref}
      onClick={handleClick as any}
      onMouseDown={handleDown as any}
      onMouseMove={handleMove as any}
      onMouseUp={handleUp as any}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
