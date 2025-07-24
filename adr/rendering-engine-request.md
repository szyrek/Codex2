# ADR: Rendering Engine Options

## Status
Proposed

## Context
The simulation currently renders bodies in 3D using Three.js. While it meets our needs today, we want to evaluate alternative engines that could offer better performance, ease of use or visual appeal.

## Requirements
- Compatible with our TypeScript/Preact stack
- Good performance for up to a few thousand simple objects
- Active community and documentation
- Eye‑catching visual effects with minimal boilerplate

## Options

### Three.js
- **Pros**: Mature, vast ecosystem, many examples, works well with our current architecture.
- **Cons**: Lower level API compared to some alternatives, complex materials system.

### Babylon.js
- **Pros**: High‑level API with built‑in loaders, scene graph and physics helpers. Advanced rendering features such as PBR, post‑processing and WebGPU support. Strong documentation.
- **Cons**: Slightly heavier bundle size. Different scene setup from our current Three.js approach.

### PlayCanvas
- **Pros**: Focus on performance with an entity component system and modern WebGL/WebGPU. Online editor for visual tweaking.
- **Cons**: Engine code is open source but tooling is proprietary. Integrating the editor with our build may be complex.

### PixiJS
- **Pros**: Excellent 2D renderer with WebGL acceleration.
- **Cons**: Primarily 2D; would require custom work for full 3D scenes.

## Recommendation
Three.js remains a solid default given its stability and the existing implementation. Babylon.js is worth prototyping as it may provide richer visuals with less boilerplate. PlayCanvas could be explored if we need an integrated editor. PixiJS does not match our 3D needs.

This ADR proposes evaluating Three.js versus Babylon.js in small prototypes to compare performance and development experience. The decision on adopting either should be discussed and finalized after the prototypes.
