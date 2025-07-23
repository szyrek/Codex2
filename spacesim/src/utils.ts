export function uniqueName(base: string, existing: string[]): string {
  if (!existing.includes(base)) return base;
  let i = 1;
  let candidate = `${base}${i}`;
  while (existing.includes(candidate)) {
    i++;
    candidate = `${base}${i}`;
  }
  return candidate;
}
