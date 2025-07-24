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

  it('resets spawn defaults when clicking Reset', async () => {
    const testSim = {
      ...sim,
      screenToWorld: (v: any) => v,
    } as any
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(<SimulationComponent sim={testSim} />, container)
    await new Promise(r => setTimeout(r, 20))
    const canvas = container.querySelector('canvas') as HTMLCanvasElement
    canvas.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100 } as any)
    canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: 0, clientY: 0, bubbles: true }))
    await new Promise(r => setTimeout(r))
    canvas.dispatchEvent(new MouseEvent('mouseup', { clientX: 10, clientY: 0, bubbles: true }))
    await new Promise(r => setTimeout(r))
    const nameInput = container.querySelector('input') as HTMLInputElement
    expect(nameInput.value).toBe('planet')
    const btn = Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Reset') as HTMLButtonElement
    btn.click()
    await new Promise(r => setTimeout(r))
    const resetInput = container.querySelector('input') as HTMLInputElement
    expect(resetInput.value).toBe('Sun')
  })
})
