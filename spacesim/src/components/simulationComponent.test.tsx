import { describe, it, expect } from 'vitest'
import { render } from 'preact'
import SimulationComponent from './Simulation'

const sim = {
  onRender: () => () => {},
  start: () => {},
  stop: () => {},
  loadScenario: () => {},
  speed: 1,
  time: 0,
  bodies: [],
  view: { zoom: 1, center: { x: 0, y: 0 }, rotation: 0 },
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

  it('shows simulation time from sim', async () => {
    let cb: () => void = () => {}
    const testSim = {
      ...sim,
      time: 0,
      onRender: (fn: () => void) => { cb = fn; return () => {} }
    }
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(<SimulationComponent sim={testSim as any} />, container)
    await new Promise(r => setTimeout(r, 20))
    let display = container.querySelector('.sim-time') as HTMLElement
    expect(display.textContent).toBe('Time 0.0s')
    testSim.time = 1.5
    cb()
    await new Promise(r => setTimeout(r, 20))
    display = container.querySelector('.sim-time') as HTMLElement
    expect(display.textContent).toBe('Time 1.5s')
  })

  it('hides spawner when showSpawner is false', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(<SimulationComponent sim={sim} showSpawner={false} />, container)
    expect(container.textContent).not.toContain('Click canvas to spawn')
  })
})
