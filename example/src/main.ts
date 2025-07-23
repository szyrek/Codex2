export function setupRotation(element: HTMLElement): void {
  let angle = 0;
  let direction = 1;
  setInterval(() => {
    angle = (angle + direction) % 360;
    element.style.transform = `rotate(${angle}deg)`;
  }, 20);

  element.addEventListener('click', () => {
    direction = -direction;
  });
}

/* c8 ignore next */
const croissant = document.getElementById('croissant');
/* c8 ignore next */
if (croissant) {
  /* c8 ignore next */
  setupRotation(croissant);
}
