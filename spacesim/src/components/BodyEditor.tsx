import { useState, useEffect } from 'preact/hooks';
import { Simulation } from '../simulation';
import Vec2 from '../vec2';
import type { BodyData } from '../physics';

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
    const pos = body.body.translation();
    const vel = body.body.linvel();
    return { ...body.data, posX: pos.x, posY: pos.y, velX: vel.x, velY: vel.y };
  });
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    if (!body) return setState(null);
    if (edited) return;
    const pos = body.body.translation();
    const vel = body.body.linvel();
    setState({
      ...body.data,
      posX: pos.x,
      posY: pos.y,
      velX: vel.x,
      velY: vel.y,
    });
  }, [body, frame, edited]);
  if (!body || !state) return null;
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
    <div className="panel" style={{ position: 'absolute', top: '140px', left: '10px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label>Name <input value={state.label} onInput={e => { setEdited(true); setState({ ...state, label: (e.target as HTMLInputElement).value }); }} /></label>
      <label>Mass <input type="number" step="0.1" value={state.mass} onInput={e => { setEdited(true); setState({ ...state, mass: parseFloat((e.target as HTMLInputElement).value) }); }} /></label>
      <label>Radius <input type="number" step="1" value={state.radius} onInput={e => { setEdited(true); setState({ ...state, radius: parseFloat((e.target as HTMLInputElement).value) }); }} /></label>
      <label>Color <input type="color" value={state.color} onInput={e => { setEdited(true); setState({ ...state, color: (e.target as HTMLInputElement).value }); }} /></label>
      <label>Pos X <input type="number" step="0.1" value={state.posX} onInput={e => { setEdited(true); setState({ ...state, posX: parseFloat((e.target as HTMLInputElement).value) }); }} /></label>
      <label>Pos Y <input type="number" step="0.1" value={state.posY} onInput={e => { setEdited(true); setState({ ...state, posY: parseFloat((e.target as HTMLInputElement).value) }); }} /></label>
      <label>Vel X <input type="number" step="0.1" value={state.velX} onInput={e => { setEdited(true); setState({ ...state, velX: parseFloat((e.target as HTMLInputElement).value) }); }} /></label>
      <label>Vel Y <input type="number" step="0.1" value={state.velY} onInput={e => { setEdited(true); setState({ ...state, velY: parseFloat((e.target as HTMLInputElement).value) }); }} /></label>
      <button onClick={apply}>Apply</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
