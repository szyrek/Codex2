import SimulationComponent from './Simulation';

export default function ShipView() {
  return (
    <div className="shipview">
      <div className="ship-cockpit">
        <div className="ship-surface ship-left panel">Left</div>
        <div className="ship-surface ship-window">
          <SimulationComponent />
        </div>
        <div className="ship-surface ship-right panel">Right</div>
      </div>
      <div className="ship-surface ship-console panel">Console</div>
    </div>
  );
}
