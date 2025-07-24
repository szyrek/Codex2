import { Simulation } from '../simulation';
import { kgToUnits, unitsToKg, formatKg, unitsToMeters, metersToUnits } from '../units';

interface Params { mass: number; radius: number; color: string; label: string }
interface Props {
  sim: Simulation; // kept for future use
  disabled: boolean;
  params: Params;
  onChange: (p: Params) => void;
}

export default function BodySpawner({ sim, disabled, params, onChange }: Props) {
  const { mass, radius, color, label } = params;
  const massExp = Math.log10(unitsToKg(mass));

  if (disabled) return null;

  return (
    <div className="panel" style={{ position: 'absolute', top: '60px', left: '10px', display: 'flex', gap: '0.5rem' }}>
      <label>Name <input value={label} onInput={e=>onChange({ ...params, label: (e.target as HTMLInputElement).value })} /></label>
      <label>Mass 10^
        <input
          type="range"
          min="20"
          max="30"
          step="0.1"
          value={massExp}
          onInput={e => onChange({
            ...params,
            mass: kgToUnits(Math.pow(10, parseFloat((e.target as HTMLInputElement).value)))
          })}
        />
        <span>{formatKg(unitsToKg(mass))}kg</span>
      </label>
      <label>Radius (m)
        <input
          type="text"
          value={unitsToMeters(radius).toExponential(2)}
          onInput={e => onChange({
            ...params,
            radius: metersToUnits(parseFloat((e.target as HTMLInputElement).value))
          })}
        />
      </label>
      <label>Color <input type="color" value={color} onInput={e=>onChange({ ...params, color: (e.target as HTMLInputElement).value })} /></label>
      <span>Click canvas to spawn</span>
    </div>
  );
}
