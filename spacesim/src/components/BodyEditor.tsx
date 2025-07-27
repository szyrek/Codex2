import { useState, useEffect } from 'preact/hooks';
import { Simulation } from '../simulation';
import type { BodyData } from '../physics';
import { calcOrbitalParams } from '../orbitalParams';
import {
  kgToUnits,
  unitsToKg,
  formatKg,
  unitsToMeters,
  metersToUnits,
  formatMeters,
} from '../units';

interface Props {
  sim: Simulation;
  body: ReturnType<Simulation['addBody']> | null;
  onDeselect: () => void;
  frame: number;
}

interface BodyState extends BodyData {}

export default function BodyEditor({ sim, body, onDeselect, frame }: Props) {
  const [state, setState] = useState<BodyState | null>(() => {
    if (!body) return null;
    return { ...body.data };
  });
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    if (!body) return setState(null);
    if (edited) return;
    setState({
      ...body.data,
    });
  }, [body, frame, edited]);
  if (!body || !state) return null;
  const massExp = Math.log10(unitsToKg(state.mass));
  const apply = () => {
    setEdited(false);
    sim.updateBody(body, {
      mass: state.mass,
      radius: state.radius,
      color: state.color,
      label: state.label,
    });
  };
  const remove = () => {
    sim.removeBody(body);
    onDeselect();
  };
  return (
    <div style={{ position: 'absolute', top: '140px', left: '10px', background: '#2228', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>Name <input value={state.label} onInput={e => { setEdited(true); setState({ ...state, label: (e.target as HTMLInputElement).value }); }} /></label>
      <label>Mass 10^
        <input
          type="range"
          min="20"
          max="30"
          step="0.1"
          value={massExp}
          onInput={e => {
            setEdited(true);
            setState({ ...state, mass: kgToUnits(Math.pow(10, parseFloat((e.target as HTMLInputElement).value))) });
          }}
        />
        <span>{formatKg(unitsToKg(state.mass))}kg</span>
      </label>
      <label>Radius (m)
        <input type="text" value={formatMeters(unitsToMeters(state.radius))}
          onInput={e => { setEdited(true); setState({ ...state, radius: metersToUnits(parseFloat((e.target as HTMLInputElement).value)) }); }} />
      </label>
      <label>Color <input type="color" value={state.color} onInput={e => { setEdited(true); setState({ ...state, color: (e.target as HTMLInputElement).value }); }} /></label>
      <div>
        Parent: Sun
      </div>
      <div>
        {(() => {
          const parent = sim.bodies.find(b => b.data.label === 'Sun') ?? sim.bodies[0];
          const p = calcOrbitalParams(body.body.position, body.body.velocity, parent.body.position, parent.data.mass, parent.data.radius);
          return (
            <>
              <div>Height {formatMeters(unitsToMeters(p.height))}m</div>
              <div>Speed {formatMeters(unitsToMeters(p.speed))}m/s</div>
              <div>Apoapsis {p.apoapsis === Infinity ? '∞' : formatMeters(unitsToMeters(p.apoapsis))+'m'}</div>
              <div>Periapsis {formatMeters(unitsToMeters(p.periapsis))}m</div>
              <div>Inclination {p.inclination.toFixed(2)}°</div>
            </>
          );
        })()}
      </div>
      <button onClick={apply}>Apply</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
