# Example Web App

This folder contains a minimal TypeScript web application demonstrating the workflow defined in the repository.

Features:
- Built with [Vite](https://vitejs.dev/) for a fast dev server.
- Tests run with [Vitest](https://vitest.dev/).
- Displays a transparent croissant that rotates clockwise and reverses on click.

## Setup
Run `npm install` once before using the commands below.

## Commands
```bash
npm run dev      # start development server
npm run build    # create production build
npm run preview  # preview the build
npm test         # run unit tests once
```

`npm run build` executes the tests first and fails if coverage is below **60%**.

## File Structure
- `index.html` – entry page
- `src/` – TypeScript source
- `assets/` – image asset

This project is intentionally simple to focus on the workflow example.

See [../practices](../practices) for repository-wide development practices.
