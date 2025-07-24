# Window View Background

- Introduces `WindowView` component that sits in the ship cockpit window.
- Large background image moves and rotates based on cockpit angle to fake 3D motion.
- ShipView now embeds this component and passes its current view angle.
- Styles allow oversize images so translation remains hidden.

Tests: `spacesim/src/components/windowView.test.tsx`.
