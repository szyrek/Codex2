export const METERS_PER_PIXEL = 10;

export function toRenderSpace(pos: { x: number; y: number }, canvasHeight: number) {
  return {
    x: pos.x / METERS_PER_PIXEL,
    y: canvasHeight - pos.y / METERS_PER_PIXEL,
  };
}

export function toSimSpace(pos: { x: number; y: number }, canvasHeight: number) {
  return {
    x: pos.x * METERS_PER_PIXEL,
    y: (canvasHeight - pos.y) * METERS_PER_PIXEL,
  };
}
