import { useState } from 'preact/hooks';
import SimulationComponent from './Simulation';
import WindowView from './WindowView';

export default function ShipView() {
  const [view, setView] = useState<'center' | 'left' | 'right'>('center');

  const onMove = (e: MouseEvent) => {
    const edge = 50;
    if (e.clientX < edge) setView('left');
    else if (e.clientX > window.innerWidth - edge) setView('right');
    else setView('center');
  };

  const angle = view === 'left' ? 20 : view === 'right' ? -20 : 0;

  return (
    <div className={`shipview view-${view}`} onMouseMove={onMove}>
      <div className="ship-cockpit">
        <div className="ship-surface ship-left panel">Console</div>
        <div className="ship-surface ship-window" style={{ position:'relative' }}>
          <WindowView angle={angle} />
          <SimulationComponent />
        </div>
        <div className="ship-surface ship-right panel">Nav</div>
      </div>
      <div className="ship-surface ship-console panel">Console</div>
      {view === 'left' && <div className="console-screen panel">Console</div>}
      {view === 'right' && (
        <div className="nav-screen panel">
          <SimulationComponent />
        </div>
      )}
    </div>
  );
}
