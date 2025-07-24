import { useEffect, useRef } from 'preact/hooks';

interface Props {
  yaw: number;
  pitch: number;
}

export default function WindowView({ yaw, pitch }: Props) {
  const imgRef = useRef<HTMLDivElement>(null);
  const starsUrl = new URL('../../images/hdr_stars.jpeg', import.meta.url).href;

  useEffect(() => {
    if (!imgRef.current) return;
    const offX = yaw * 2;
    const offY = pitch * 2;
    imgRef.current.style.transform = `translate(${offX}px, ${offY}px) rotate(${yaw * 0.2}deg) scale(2)`;
    imgRef.current.style.backgroundPosition = `${-offX}px ${-offY}px`;
  }, [yaw, pitch]);

  return (
    <div className="window-view">
      <div
        ref={imgRef}
        className="window-image"
        style={{ backgroundImage: `url(${starsUrl})` }}
      />
    </div>
  );
}
