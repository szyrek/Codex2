# Spacesim

A simple 3D physics sandbox illustrating basic orbital mechanics. The project uses a lightweight custom engine built on Three.js vectors to simulate gravity between bodies. The UI is built with **Preact** and composed of small components.

Bodies are spawned by dragging on the canvas while the spawner panel is visible. The drag length defines the initial velocity and short drags create a body with near-zero velocity. A green line shows the drag vector as you hold the mouse. When released a body is created with a unique label from the spawner panel. The first spawn defaults to a **Sun** with mass 100, radius 50 and yellow color. After that the spawner switches to a **planet** preset with random color for each new body. Mass now uses a slider scaled from a small moon to the Sun and all distances are shown in metric units.

Clicking an existing body opens an editor panel. The editor now shows live position and velocity values which can be edited alongside mass, radius and color. Scenarios (predefined sequences of events) can be loaded using the **Scenario** button within the sandbox; a simple Solar System example is included. The top-right of the screen contains **Pause** and **Reset** buttons to control the simulation.

A new **Shipview** tab displays a basic cockpit layout. Three angled panels and
a bottom console create a simple 3D illusion. The centre "window" hosts the
sandbox while the right panel opens a navigation screen. Dragging on this
navigation view rotates the camera instead of spawning bodies.

The simulation is built from small modules connected through a simple event bus powered by **mitt**. `GameLoop` ticks once per animation frame using RxJS and passes the elapsed time to the simulation. `PhysicsEngine` handles simple 3D dynamics using Three.js vectors. A single `ThreeRenderer` listens for render events and draws bodies, orbit trails and the drag line using Three.js.

Bodies also render dotted orbit trails based on their current trajectory. The trail uses the body's color unless it is escaping (blue) or on a collision course (red).

## Setup
```bash
npm install
```

## Commands
```bash
npm run dev      # start development server
npm run build    # create production build
npm run preview  # preview the build
npm test         # run unit tests
npm run test:e2e  # run browser tests with Playwright
npm run test:perf # run manual performance benchmarks
```

Playwright requires browser binaries. If tests fail complaining about missing browsers, run:
```bash
npx playwright install --with-deps
```

The entry page `index.html` mounts `src/main.tsx`. Core physics logic lives in `src/physics/`, the Preact components in `src/components/` and scenarios in `src/scenarios/`.

The build script runs the test suite first and fails if unit test coverage drops below **60%**.

`npm run test:perf` measures physics and renderer performance. The benchmarks are manual only and help track how many bodies we can simulate or draw at acceptable frame rates.

See [../practices](../practices) for overall development guidelines.

## Retro UI

The application now includes a built‑in retro theme styled after classic
CRT interfaces. Panels and buttons glow in neon green and cyan to mimic an
80s command deck. Inputs match the palette with black backgrounds and neon
borders while buttons have a metallic gradient sheen. The file
`ui-skeleton.html` remains as a standalone reference demonstrating the
basic layout and can be opened directly in a browser. If Vite reports a
CSS parsing error, ensure all blocks in `style.css` end with a closing
brace.
