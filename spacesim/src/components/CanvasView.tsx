import { useEffect, useRef } from 'preact/hooks';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';

interface Props {
  sim: Simulation;
  onClick?: (pos: Vec2) => void;
  onMouseDown?: (pos: Vec2) => void;
  onMouseMove?: (pos: Vec2) => void;
  onMouseUp?: (pos: Vec2) => void;
}

export default function CanvasView({ sim, onClick }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    sim.setCanvas(canvas);
  }, [sim]);
  const toVec = (e: MouseEvent) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    return Vec2(e.clientX - rect.left, e.clientY - rect.top);
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
