# Spacesim

A simple 2D physics sandbox illustrating basic orbital mechanics. The project uses TypeScript and Planck.js to simulate gravity between bodies. The canvas fills the browser window and resizes automatically.

You can spawn planets by dragging on the canvas. Click without moving to create a stationary body. The UI allows setting the name, mass, radius (km) and color of the new body. Names are automatically numbered to remain unique. While dragging a new planet the simulation pauses so you can adjust the throw vector which is visualised with a coloured arrow. Green indicates a bound orbit, blue an escape trajectory and red a very low velocity that will likely crash. Selecting an existing body displays an edit panel and pauses throwing. Bodies merge on contact when one is more than three times heavier, otherwise they bounce.

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
```

The entry page `index.html` loads `src/main.ts`. The core simulation logic resides
in `src/sandbox.ts`. Rendering can also be invoked directly in tests using
`renderBodies` from `src/render.ts`. Unit tests cover physics behaviour and a
simple end-to-end check renders a miniature solar system to a mock canvas.
