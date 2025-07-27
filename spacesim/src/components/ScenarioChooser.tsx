import { useState, useEffect } from 'preact/hooks';
import { Simulation, type ScenarioEvent } from '../simulation';
import { solarSystem } from '../scenarios/solarSystem';
import { jupiterSystem } from '../scenarios/jupiterSystem';

const scenarios = {
  solar: solarSystem,
  jupiter: jupiterSystem,
} as const;

interface Props {
  sim: Simulation;
  visible: boolean;
}

export default function ScenarioChooser({ sim, visible }: Props) {
  const [choice, setChoice] = useState<keyof typeof scenarios>('solar');
  const scenario = scenarios[choice];

  useEffect(() => {
    if (visible) sim.loadScenario(scenario as ScenarioEvent[]);
  }, [visible, scenario, sim]);

  const change = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value as keyof typeof scenarios;
    setChoice(val);
    sim.loadScenario(scenarios[val]);
  };

  if (!visible) return null;

  return (
    <div className="panel" style={{ position: 'absolute', top: '60px', left: '10px' }}>
      <label>
        Scenario:
        <select value={choice} onChange={change}>
          <option value="solar">Solar System</option>
          <option value="jupiter">Jupiter &amp; Moons</option>
        </select>
      </label>
    </div>
  );
}
