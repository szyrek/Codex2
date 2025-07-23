import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'preact';
import DocsView from './DocsView';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
});

describe('DocsView', () => {
  it('loads README on mount', async () => {
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
    expect(fetchMock).toHaveBeenCalled();
    expect(container.innerHTML).toContain('<h1>Hello</h1>');
  });
});
