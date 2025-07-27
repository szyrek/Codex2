import { useState } from 'preact/hooks';

interface Props {
  onAbort?: () => void;
}

export default function BurnControls({ onAbort }: Props) {
  const [params, setParams] = useState({ p1: '', p2: '', p3: '' });
  const [tuned, setTuned] = useState(false);

  const change = (k: keyof typeof params) => (e: Event) => {
    const t = e.target as HTMLInputElement;
    setParams({ ...params, [k]: t.value });
  };

  const tune = () => setTuned(true);
  const abort = () => { setTuned(false); onAbort?.(); };

  return (
    <div className="burn-controls panel" style={{ display:'flex', flexDirection:'column', gap:'0.25rem' }}>
      <input placeholder="Param 1" value={params.p1} onInput={change('p1')} />
      <input placeholder="Param 2" value={params.p2} onInput={change('p2')} />
      <input placeholder="Param 3" value={params.p3} onInput={change('p3')} />
      {!tuned ? (
        <button onClick={tune}>Tune</button>
      ) : (
        <button onClick={abort}>Abort</button>
      )}
      {tuned && (
        <div className="burn-info" style={{ fontSize:'0.8em' }}>
          <div>Vector {params.p1},{params.p2},{params.p3}</div>
          <div>Burn time 0s</div>
          <div>At 0s</div>
        </div>
      )}
    </div>
  );
}
