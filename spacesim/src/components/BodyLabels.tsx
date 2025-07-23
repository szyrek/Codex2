import { Simulation } from '../simulation';

interface Props { sim: Simulation; frame: number }

export default function BodyLabels({ sim }: Props) {
  return (
    <>
      {sim.bodies.map((b) => {
        const pos = sim.worldToScreen(b.body.translation());
        const dpr = window.devicePixelRatio || 1;
        const screenX = pos.x / dpr;
        const screenY = pos.y / dpr;
        return (
          <div
            key={b.data.label}
            className="label"
            style={{
              position: 'absolute',
              left: `${screenX + b.data.radius + 2}px`,
              top: `${screenY - 10}px`,
            }}
          >
            {b.data.label}
          </div>
        );
      })}
    </>
  );
}
