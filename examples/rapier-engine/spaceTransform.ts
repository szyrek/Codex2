export const METERS_PER_PIXEL = 1;

export function toRender({ x, y }: { x: number; y: number }, canvasHeight: number) {
  return { x: x / METERS_PER_PIXEL, y: canvasHeight - y / METERS_PER_PIXEL };
}
