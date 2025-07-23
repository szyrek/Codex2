import { Sandbox, BodyData } from './sandbox';
import { Vec2 } from 'planck-js';

const canvas = document.getElementById('sim') as HTMLCanvasElement;
const button = document.getElementById('toggle') as HTMLButtonElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const massInput = document.getElementById('mass') as HTMLInputElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const status = document.getElementById('status') as HTMLElement;
const ctx = canvas.getContext('2d')!;

function resize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resize();
window.addEventListener('resize', resize);

const sandbox = new Sandbox();
let running = true;
button.addEventListener('click', () => {
  running = !running;
  button.textContent = running ? 'Pause' : 'Play';
  status.textContent = running ? 'Running' : 'Paused';
});
status.textContent = 'Running';
resetBtn.addEventListener('click', () => {
  sandbox.reset();
  selected = null;
});

let mouseDown = false;
let start = Vec2();
let selected: ReturnType<Sandbox['addBody']> | null = null;

canvas.addEventListener('mousedown', (e) => {
  mouseDown = true;
  start = Vec2(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', (e) => {
  if (!mouseDown) return;
  mouseDown = false;
  const end = Vec2(e.offsetX, e.offsetY);
  const drag = Vec2(end.x - start.x, end.y - start.y);
  if (drag.length() < 5) {
    selected = sandbox.findBody(end) || null;
    if (selected) {
      nameInput.value = selected.data.label;
      massInput.value = String(selected.data.mass);
    }
    return;
  }
  const velocity = drag.mul(0.01);
  const data: BodyData = {
    mass: parseFloat(massInput.value) || 1,
    radius: 5,
    color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    label: nameInput.value || 'body'
  };
  sandbox.addBody(start, velocity, data);
});

function applyEdits() {
  if (!selected) return;
  sandbox.updateBody(selected, {
    mass: parseFloat(massInput.value) || selected.data.mass,
    label: nameInput.value
  });
}

nameInput.addEventListener('change', applyEdits);
massInput.addEventListener('change', applyEdits);

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const obj of sandbox.bodies) {
    const pos = obj.body.getPosition();
    ctx.beginPath();
    ctx.fillStyle = obj.data.color;
    ctx.arc(pos.x, pos.y, obj.data.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(obj.data.label, pos.x + obj.data.radius + 2, pos.y - 2);
  }
}

function loop() {
  if (running) {
    sandbox.step(1 / 60);
  }
  render();
  requestAnimationFrame(loop);
}

loop();
