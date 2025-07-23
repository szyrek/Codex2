import { Sandbox, BodyData, G } from './sandbox';
import planck, { Vec2 } from 'planck-js';
import { uniqueName } from './utils';
import { renderBodies } from './render';

const canvas = document.getElementById('sim') as HTMLCanvasElement;
const button = document.getElementById('toggle') as HTMLButtonElement;
const resetBtn = document.getElementById('reset') as HTMLButtonElement;
const massInput = document.getElementById('mass') as HTMLInputElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const colorInput = document.getElementById('color') as HTMLInputElement;
const radiusInput = document.getElementById('radius') as HTMLInputElement;
const editUI = document.getElementById('edit-ui') as HTMLElement;
const editName = document.getElementById('edit-name') as HTMLInputElement;
const editMass = document.getElementById('edit-mass') as HTMLInputElement;
const editRadius = document.getElementById('edit-radius') as HTMLInputElement;
const editColor = document.getElementById('edit-color') as HTMLInputElement;
const deleteBtn = document.getElementById('delete-body') as HTMLButtonElement;
const list = document.getElementById('body-list') as HTMLElement;
const status = document.getElementById('status') as HTMLElement;
const ctx = canvas.getContext('2d')!;

function updateRunState() {
  button.textContent = running ? 'Pause' : 'Play';
  status.textContent = running ? 'Running' : 'Paused';
}

function resize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}
resize();
window.addEventListener('resize', resize);

const sandbox = new Sandbox();
let running = true;
let throwing = false;
let throwStart = Vec2();
let throwEnd = Vec2();
let pausedForThrow = false;
button.addEventListener('click', () => {
  running = !running;
  updateRunState();
});
updateRunState();
resetBtn.addEventListener('click', () => {
  sandbox.reset();
  selected = null;
  updateBodyList();
});

let mouseDown = false;
let start = Vec2();
let selected: ReturnType<Sandbox['addBody']> | null = null;

function fillInputs(data: BodyData) {
  editName.value = data.label;
  editMass.value = String(data.mass);
  editRadius.value = String(data.radius);
  editColor.value = data.color;
}

function updateBodyList() {
  list.innerHTML = '';
  sandbox.bodies.forEach((obj) => {
    const li = document.createElement('li');
    li.textContent = obj.data.label;
    li.addEventListener('click', () => {
      selected = obj;
      fillInputs(obj.data);
      editUI.classList.remove('hidden');
    });
    list.appendChild(li);
  });
}

canvas.addEventListener('mousedown', (e) => {
  mouseDown = true;
  start = Vec2(e.offsetX, e.offsetY);
  const found = sandbox.findBody(start);
  if (found) {
    selected = found;
    fillInputs(found.data);
    editUI.classList.remove('hidden');
    throwing = false;
  } else {
    if (selected) {
      selected = null;
      editUI.classList.add('hidden');
      throwing = false;
    } else {
      throwing = true;
      throwStart = start;
      throwEnd = start;
    }
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (!mouseDown || !throwing) return;
  throwEnd = Vec2(e.offsetX, e.offsetY);
  const drag = Vec2.sub(throwEnd, throwStart);
  if (!pausedForThrow && drag.length() > 5) {
    pausedForThrow = running;
    running = false;
    updateRunState();
  }
});

canvas.addEventListener('mouseup', (e) => {
  if (!mouseDown) return;
  mouseDown = false;
  if (!throwing) {
    return;
  }
  const end = Vec2(e.offsetX, e.offsetY);
  const drag = Vec2.sub(end, throwStart);
  throwing = false;
  let velocity: planck.Vec2;
  if (drag.length() < 5) {
    velocity = Vec2();
  } else {
    const factor = drag.length() / (drag.length() + 50);
    velocity = drag.mul(0.01 * factor);
  }
  if (pausedForThrow) {
    running = true;
    updateRunState();
    pausedForThrow = false;
  }
  const color = colorInput.value || '#' + Math.floor(Math.random() * 16777215).toString(16);
  const data: BodyData = {
    mass: parseFloat(massInput.value) || 1,
    radius: parseFloat(radiusInput.value) || 5,
    color,
    label: uniqueName(nameInput.value || 'body', sandbox.bodies.map(b => b.data.label))
  };
  sandbox.addBody(throwStart, velocity, data);
  updateBodyList();
});

function applyEdits() {
  if (!selected) return;
  sandbox.updateBody(selected, {
    mass: parseFloat(editMass.value) || selected.data.mass,
    radius: parseFloat(editRadius.value) || selected.data.radius,
    color: editColor.value,
    label: editName.value
  });
  updateBodyList();
}

editName.addEventListener('change', applyEdits);
editMass.addEventListener('change', applyEdits);
editRadius.addEventListener('change', applyEdits);
editColor.addEventListener('change', applyEdits);

deleteBtn.addEventListener('click', () => {
  if (!selected) return;
  sandbox.removeBody(selected);
  selected = null;
  editUI.classList.add('hidden');
  updateBodyList();
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderBodies(ctx, sandbox.bodies);
  if (mouseDown && throwing) {
    const drag = Vec2.sub(throwEnd, throwStart);
    const velocity = drag.mul(0.01 * (drag.length() / (drag.length() + 50)));
    let color = 'green';
    const bodies = sandbox.bodies;
    if (bodies.length) {
      let nearest = bodies[0];
      let min = Vec2.distance(nearest.body.getPosition(), throwStart);
      for (const b of bodies) {
        const d = Vec2.distance(b.body.getPosition(), throwStart);
        if (d < min) { min = d; nearest = b; }
      }
      const r = min;
      const v2 = velocity.lengthSquared();
      const energy = 0.5 * v2 - (G * nearest.data.mass) / r;
      if (v2 < 0.1) color = 'red';
      else if (energy > 0) color = 'blue';
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(throwStart.x, throwStart.y);
    ctx.lineTo(throwEnd.x, throwEnd.y);
    ctx.stroke();
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
