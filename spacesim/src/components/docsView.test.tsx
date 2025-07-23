import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from 'preact';
import DocsView from './DocsView';

const flush = () => new Promise(r => setTimeout(r, 20));
const originalFetch = globalThis.fetch;

afterEach(() => {
  document.body.innerHTML = '';
  globalThis.fetch = originalFetch;
  if (typeof window !== 'undefined') {
    (window as any).fetch = originalFetch;
  }
});

describe('DocsView', () => {
  it('loads README on mount', async () => {
    const responses = [
      { json: () => Promise.resolve({ major: 1 }) },
      { json: () => Promise.resolve({ files: ['README.md'] }) },
      { text: () => Promise.resolve('# Hello') }
    ];
    const fetchMock = vi.fn(() => Promise.resolve(responses.shift()!));
    globalThis.fetch = fetchMock as any;
    if (typeof window !== 'undefined') {
      (window as any).fetch = fetchMock;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<DocsView />, container);
    await flush();

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(container.querySelector('h1')?.textContent).toBe('Hello');
  });

  it('handles invalid manifest gracefully', async () => {
    const responses = [
      { json: () => Promise.resolve({ major: 1 }) },
      { json: () => Promise.reject(new SyntaxError('invalid')) }
    ];
    const fetchMock = vi.fn(() => Promise.resolve(responses.shift()!));
    globalThis.fetch = fetchMock as any;
    if (typeof window !== 'undefined') {
      (window as any).fetch = fetchMock;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<DocsView />, container);
    await flush();

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
    globalThis.fetch = fetchMock as any;
    if (typeof window !== 'undefined') {
      (window as any).fetch = fetchMock;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);
    render(<DocsView />, container);
    await flush();

    const root = container.firstElementChild as HTMLElement;
    expect(root.children.length).toBe(2);
    expect(root.children[0].querySelector('select')).not.toBeNull();
    expect(root.children[0].querySelectorAll('li').length).toBe(1);
  });
});
