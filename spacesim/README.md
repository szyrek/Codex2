# Spacesim

A simple 2D physics sandbox illustrating basic orbital mechanics. The project uses TypeScript and Planck.js to simulate gravity between bodies. The UI is built with **Preact** and composed of small components.

Bodies are spawned by dragging on the canvas while the spawner panel is visible. The drag length defines the initial velocity and short drags create a body with near-zero velocity. A green line shows the drag vector as you hold the mouse. When released a body is created with a unique label from the spawner panel.

Clicking an existing body opens an editor panel. Scenarios (predefined sequences of events) can be loaded from the Scenario tab; a simple Solar System example is included. The top-right of the screen contains **Pause** and **Reset** buttons to control the simulation.

The simulation is built from small modules connected through a simple event bus powered by **mitt**. `GameLoop` ticks using RxJS intervals, the `PhysicsEngine` handles Planck.js dynamics and independent renderers draw bodies and overlay elements. `CompositeRenderer` runs the collection of renderers each frame. This decoupled design keeps each part focused and easy to test.

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
```

The entry page `index.html` mounts `src/main.tsx`. Core physics logic lives in `src/physics/`, the Preact components in `src/components/` and scenarios in `src/scenarios/`.

The build script runs the test suite first and fails if unit test coverage drops below **90%**.

See [../practices](../practices) for overall development guidelines.
