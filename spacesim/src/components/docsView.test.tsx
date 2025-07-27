import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'preact';
import DocsView from './DocsView';

const originalFetch = global.fetch;

afterEach(() => {
  document.body.innerHTML = '';
  global.fetch = originalFetch;
});

describe('DocsView', () => {
  it('loads README on mount using base-relative paths', async () => {
    const responses = [
      { json: () => Promise.resolve({ major: 1 }) },
      { json: () => Promise.resolve({ files: ['README.md'] }) },
      { text: () => Promise.resolve('# Hello') }
    ];
    const fetchMock = vi.fn(() => Promise.resolve(responses.shift()!));
    global.fetch = fetchMock as any;
    (global as any).fetch = fetchMock;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<DocsView />, container);
    await new Promise(r => setTimeout(r, 30));
    const base = import.meta.env.BASE_URL;
    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toBe(`${base}docs/version.json`);
    expect(fetchMock.mock.calls[1][0]).toBe(`${base}docs/1/manifest.json`);
    expect(fetchMock.mock.calls[2][0]).toBe(`${base}docs/1/README.md`);
    expect(container.innerHTML).toContain('<h1>Hello</h1>');
  });
  it('handles invalid manifest gracefully', async () => {
    const responses = [
      { json: () => Promise.resolve({ major: 1 }) },
      { json: () => Promise.reject(new SyntaxError('invalid')) }
    ];
    const fetchMock = vi.fn(() => Promise.resolve(responses.shift()!));
    global.fetch = fetchMock as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<DocsView />, container);
    await new Promise(r => setTimeout(r, 30));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(container.querySelectorAll('li').length).toBe(0);
  });

  it('renders sidebar layout', async () => {
    const responses = [
      { json: () => Promise.resolve({ major: 1 }) },
      { json: () => Promise.resolve({ files: ['README.md'] }) },
      { text: () => Promise.resolve('# Hello') }
    ];
    const fetchMock = vi.fn(() => Promise.resolve(responses.shift()!));
    global.fetch = fetchMock as any;
    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<DocsView />, container);
    await new Promise(r => setTimeout(r, 30));
    const root = container.firstElementChild as HTMLElement;
    expect(root.children.length).toBe(2);
    const sidebar = root.children[0] as HTMLElement;
    expect(sidebar.querySelector('select')).not.toBeNull();
    expect(sidebar.querySelectorAll('li').length).toBe(1);
  });
});
