# WSAD Thruster Controls

- Adds keyboard controls that simulate small thrusters using the WSAD keys.
- Holding a key gradually increases rotational velocity and the ship continues
  to spin until counter-thrust is applied.
- `WindowView` now accepts yaw and pitch to render an endless star field that
  moves with the ship.
- Stars come from `images/hdr_stars.jpeg` and repeat at the edges to fake depth.
- Tests cover the new transformation logic and basic keyboard rotation.
