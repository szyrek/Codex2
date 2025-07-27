import { useState } from 'preact/hooks';
import SimulationView from './Simulation';
import { solarSystem } from '../scenarios/solarSystem';
import { jupiterSystem } from '../scenarios/jupiterSystem';

const all = {
  solar: solarSystem,
  jupiter: jupiterSystem,
} as const;

export default function ScenarioView() {
  const [choice, setChoice] = useState<keyof typeof all>('solar');
  const scenario = all[choice];
  const change = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value as keyof typeof all;
    setChoice(val);
  };
  return (
    <div style={{position:'relative', width:'100%', height:'100%'}}>
      <SimulationView scenario={scenario} />
      <div className="panel" style={{position:'absolute', top:'60px', left:'10px'}}>
        <label>
          Scenario:
          <select value={choice} onChange={change}>
            <option value="solar">Solar System</option>
            <option value="jupiter">Jupiter &amp; Moons</option>
          </select>
        </label>
      </div>
    </div>
  );
}
