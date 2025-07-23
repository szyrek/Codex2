import { describe, it, expect } from 'vitest'
import { render } from 'preact'
import SimulationComponent from './Simulation'

const sim = {
  onRender: () => () => {},
  start: () => {},
  stop: () => {},
  loadScenario: () => {},
  speed: 1,
  bodies: [],
  view: { zoom: 1, center: { x: 0, y: 0 } },
  findBody: () => null,
  setOverlay: () => {},
  setCanvas: () => {},
  addBody: () => ({ body: {}, data: {} }),
  pan: () => {},
  zoom: () => {},
  centerOn: () => {},
  reset: () => {},
  resetView: () => {},
  speedUp: () => {},
  slowDown: () => {},
  resetSpeed: () => {}
} as any

describe('SimulationComponent', () => {
  it('exposes sim on window in dev', async () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    expect((window as any).sim).toBeUndefined()
    render(<SimulationComponent sim={sim} />, container)
    await new Promise(r => setTimeout(r, 20))
    expect((window as any).sim).toBe(sim)
  })
})
