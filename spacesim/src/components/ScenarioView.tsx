import SimulationView from './Simulation';
import { solarSystem } from '../scenarios/solarSystem';

export default function ScenarioView() {
  return <SimulationView scenario={solarSystem} />;
}
