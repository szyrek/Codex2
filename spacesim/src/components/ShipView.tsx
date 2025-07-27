import { useState, useEffect, useRef } from 'preact/hooks';
import NavigationView from './NavigationView';
import BurnControls from './BurnControls';
import WindowView from './WindowView';
import SimulationComponent from './Simulation';

export default function ShipView() {
  const [view, setView] = useState<'center' | 'left' | 'right'>('center');
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const vel = useRef({ yaw: 0, pitch: 0 });
  const keys = useRef({ w:false, a:false, s:false, d:false });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'w') keys.current.w = true;
      else if (e.key === 's') keys.current.s = true;
      else if (e.key === 'a') keys.current.a = true;
      else if (e.key === 'd') keys.current.d = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'w') keys.current.w = false;
      else if (e.key === 's') keys.current.s = false;
      else if (e.key === 'a') keys.current.a = false;
      else if (e.key === 'd') keys.current.d = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    let frame: number;
    const step = () => {
      if (keys.current.w) vel.current.pitch -= 0.0005;
      if (keys.current.s) vel.current.pitch += 0.0005;
      if (keys.current.a) vel.current.yaw += 0.0005;
      if (keys.current.d) vel.current.yaw -= 0.0005;
      setYaw(y => y + vel.current.yaw);
      setPitch(p => p + vel.current.pitch);
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      cancelAnimationFrame(frame);
    };
  }, []);

  const onMove = (e: MouseEvent) => {
    const edge = 50;
    if (e.clientX < edge) setView('left');
    else if (e.clientX > window.innerWidth - edge) setView('right');
    else setView('center');
  };

  const angle = view === 'left' ? -20 : view === 'right' ? 20 : 0;

  return (
    <div className={`shipview view-${view}`} onMouseMove={onMove}>
      <div className="ship-cockpit">
        <div className="ship-surface ship-left panel">Console</div>
        <div className="ship-surface ship-window" style={{ position:'relative' }}>
          <WindowView yaw={angle + yaw * 57.3} pitch={pitch * 57.3} />
          <NavigationView />
        </div>
        <div className="ship-surface ship-right panel">
          {view !== 'right' && <div className="nav-static" />}
          Nav
        </div>
      </div>
      <div className="ship-surface ship-console panel">Console</div>
      {view === 'left' && (
        <div className="console-screen panel">
          <SimulationComponent showSpawner={false} />
        </div>
      )}
      {view === 'right' && (
        <div className="nav-screen panel" style={{ position:'relative' }}>
          <NavigationView />
          <BurnControls />
        </div>
      )}
    </div>
  );
}
