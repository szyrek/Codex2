import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'preact';
import DocsView from './DocsView';

const originalFetch = global.fetch;

afterEach(() => {
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
    await new Promise(r => setTimeout(r, 20));
    const base = import.meta.env.BASE_URL;
    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][0]).toBe(`${base}docs/version.json`);
    expect(fetchMock.mock.calls[1][0]).toBe(`${base}docs/1/manifest.json`);
    expect(fetchMock.mock.calls[2][0]).toBe(`${base}docs/1/README.md`);
    expect(container.innerHTML).toContain('<h1>Hello</h1>');
  });
});
