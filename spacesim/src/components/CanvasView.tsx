import { useEffect, useRef } from 'preact/hooks';
import { Simulation } from '../simulation';
import Vec2 from '../vec2';

interface Props {
  sim: Simulation;
  onClick?: (pos: Vec2) => void;
  onMouseDown?: (pos: Vec2) => void;
  onMouseMove?: (pos: Vec2) => void;
  onMouseUp?: (pos: Vec2) => void;
}

import { JSX } from 'preact';

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
  const toVec = (e: JSX.TargetedMouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const p = Vec2(
      (e.clientX - rect.left) * dpr,
      (e.clientY - rect.top) * dpr
    );
    return sim.screenToWorld(p);
  };
  const handleClick: JSX.MouseEventHandler<HTMLCanvasElement> = e => {
    onClick?.(toVec(e));
  };
  const handleDown: JSX.MouseEventHandler<HTMLCanvasElement> = e => onMouseDown?.(toVec(e));
  const handleMove: JSX.MouseEventHandler<HTMLCanvasElement> = e => onMouseMove?.(toVec(e));
  const handleUp: JSX.MouseEventHandler<HTMLCanvasElement> = e => onMouseUp?.(toVec(e));
  return (
    <canvas
      ref={ref}
      className="sim-canvas"
      onClick={handleClick}
      onMouseDown={handleDown}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
