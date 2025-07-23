import { Simulation } from '../simulation';

interface Props { sim: Simulation; frame: number }

export default function BodyLabels({ sim }: Props) {
  return (
    <>
      {sim.bodies.map((b) => {
        const pos = sim.worldToScreen(b.body.getPosition());
        return (
          <div
            key={b.data.label}
            style={{
              position: 'absolute',
              left: `${pos.x + b.data.radius + 2}px`,
              top: `${pos.y - 10}px`,
              pointerEvents: 'none',
              color: '#fff',
              fontSize: '12px',
              whiteSpace: 'nowrap',
            }}
          >
            {b.data.label}
          </div>
        );
      })}
    </>
  );
}
