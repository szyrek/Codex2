import { useEffect, useRef } from 'preact/hooks';

interface Props {
  angle: number;
}

export default function WindowView({ angle }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    if (!imgRef.current) return;
    const offset = angle * 2;
    imgRef.current.style.transform = `translateX(${offset}px) rotate(${angle * 0.2}deg) scale(2)`;
  }, [angle]);

  return (
    <div className="window-view">
      <img
        ref={imgRef}
        src={`${base}images/logo.png`}
        alt="Space background"
        className="window-image"
      />
    </div>
  );
}
