import { useState } from 'preact/hooks';
import Draggable from './Draggable';

interface Layout { [id: string]: { x: number; y: number } }
const STORAGE_KEY = 'test-layout';

const defaultLayout: Layout = {
  a: { x: 20, y: 80 },
  b: { x: 160, y: 80 },
  c: { x: 20, y: 160 },
};

export default function TestView() {
  const [layout, setLayout] = useState<Layout>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultLayout;
  });
  const [locked, setLocked] = useState(true);

  const move = (id: string, x: number, y: number) => {
    setLayout(l => ({ ...l, [id]: { x, y } }));
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  };

  const load = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setLayout(JSON.parse(stored));
  };

  return (
    <div className="test-view" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button
        className="lock-toggle"
        data-locked={locked}
        style={{ position: 'absolute', top: 10, left: 10, background: locked ? 'red' : 'green' }}
        onClick={() => setLocked(l => !l)}
      >
        Lock
      </button>
      <button style={{ position: 'absolute', top: 10, left: 70 }} onClick={save}>Save</button>
      <button style={{ position: 'absolute', top: 10, left: 130 }} onClick={load}>Load</button>
      <Draggable id="a" locked={locked} pos={layout.a} onMove={move}>
        <button>A</button>
      </Draggable>
      <Draggable id="b" locked={locked} pos={layout.b} onMove={move}>
        <button>B</button>
      </Draggable>
      <Draggable id="c" locked={locked} pos={layout.c} onMove={move}>
        <input placeholder="type" />
      </Draggable>
    </div>
  );
}
