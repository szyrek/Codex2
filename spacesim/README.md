# Spacesim

A simple 2D physics sandbox illustrating basic orbital mechanics. The project uses TypeScript and Planck.js to simulate gravity between bodies. The canvas fills the browser window and resizes automatically.

You can spawn planets by dragging on the canvas and entering a name and mass. Existing bodies may be selected to edit their parameters. Controls allow pausing/resuming the simulation and resetting all bodies.

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

The entry page `index.html` loads `src/main.ts`. The core simulation logic resides in `src/sandbox.ts`.
