import { useState, useEffect } from 'preact/hooks';
import { Simulation } from '../simulation';
import { Vec2 } from 'planck-js';
import type { BodyData } from '../physics';
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

interface BodyState extends BodyData {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
}

export default function BodyEditor({ sim, body, onDeselect, frame }: Props) {
  const [state, setState] = useState<BodyState | null>(() => {
    if (!body) return null;
    const pos = body.body.getPosition();
    const vel = body.body.getLinearVelocity();
    return { ...body.data, posX: pos.x, posY: pos.y, velX: vel.x, velY: vel.y };
  });
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    if (!body) return setState(null);
    if (edited) return;
    const pos = body.body.getPosition();
    const vel = body.body.getLinearVelocity();
    setState({
      ...body.data,
      posX: pos.x,
      posY: pos.y,
      velX: vel.x,
      velY: vel.y,
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
      position: Vec2(state.posX, state.posY),
      velocity: Vec2(state.velX, state.velY),
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
      <label>Pos X (m) <input type="text" value={formatMeters(unitsToMeters(state.posX))} onInput={e => { setEdited(true); setState({ ...state, posX: metersToUnits(parseFloat((e.target as HTMLInputElement).value)) }); }} /></label>
      <label>Pos Y (m) <input type="text" value={formatMeters(unitsToMeters(state.posY))} onInput={e => { setEdited(true); setState({ ...state, posY: metersToUnits(parseFloat((e.target as HTMLInputElement).value)) }); }} /></label>
      <label>Vel X (m/s) <input type="text" value={formatMeters(unitsToMeters(state.velX))} onInput={e => { setEdited(true); setState({ ...state, velX: metersToUnits(parseFloat((e.target as HTMLInputElement).value)) }); }} /></label>
      <label>Vel Y (m/s) <input type="text" value={formatMeters(unitsToMeters(state.velY))} onInput={e => { setEdited(true); setState({ ...state, velY: metersToUnits(parseFloat((e.target as HTMLInputElement).value)) }); }} /></label>
      <button onClick={apply}>Apply</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
