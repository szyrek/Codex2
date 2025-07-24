import { useState } from 'preact/hooks';
import SimulationComponent from './Simulation';
import { ShipConfig } from './ConfigView';

interface Props { config: ShipConfig }

export default function ShipView({ config }: Props) {
  const [view, setView] = useState<'center' | 'left' | 'right'>('center');

  const onMove = (e: MouseEvent) => {
    const edge = 50;
    if (e.clientX < edge) setView('left');
    else if (e.clientX > window.innerWidth - edge) setView('right');
    else setView('center');
  };

  const leftT = `rotateY(${config.flipRotation ? -20 : 20}deg) translateX(${config.flipRotation ? -20 : 20}px)`;
  const rightT = `rotateY(${config.flipRotation ? 20 : -20}deg) translateX(${config.flipRotation ? 20 : -20}px)`;
  const cockpitStyle =
    view === 'left' ? { transform: leftT } : view === 'right' ? { transform: rightT } : {};

  return (
    <div className={`shipview view-${view}`} onMouseMove={onMove} style={{ ['--console-height' as any]: `${config.midHeight}px` }}>
      <div className="ship-cockpit" style={cockpitStyle}>
        <div className="ship-surface ship-left panel">Console</div>
        <div className="ship-surface ship-window">
          <SimulationComponent />
        </div>
        <div className="ship-surface ship-right panel">Nav</div>
      </div>
      <div className="ship-surface ship-console panel" style={{ transform:'rotateX(25deg)', transformOrigin:'top', marginTop:'10px' }}>Console</div>
      {view === 'left' && <div className="console-screen panel">Console</div>}
      {view === 'right' && (
        <div className="nav-screen panel" style={{ width:'60%' }}>
          <SimulationComponent />
        </div>
      )}
    </div>
  );
}
