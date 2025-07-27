import { useRef, useState } from 'preact/hooks';

interface Props {
  id: string;
  locked: boolean;
  pos: { x: number; y: number };
  onMove: (id: string, x: number, y: number) => void;
  children: preact.ComponentChildren;
}

export default function Draggable({ id, locked, pos, onMove, children }: Props) {
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null);
  const start = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const down = (e: MouseEvent) => {
    if (locked) return;
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    setOffset({ x: pos.x, y: pos.y });
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const move = (e: MouseEvent) => {
    if (!offset) return;
    onMove(id, e.clientX - start.current.x, e.clientY - start.current.y);
  };

  const up = () => {
    setOffset(null);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
  };

  return (
    <div
      data-id={id}
      className="draggable"
      style={{ position: 'absolute', left: pos.x, top: pos.y, cursor: locked ? 'default' : 'move' }}
      onMouseDown={down}
    >
      {children}
    </div>
  );
}
