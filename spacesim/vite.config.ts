import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig({
  plugins: [
    preact(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'docs'),
          dest: 'docs'
        }
      ]
    })
  ],
  server: {
    fs: {
      allow: ['..']
    }
  }
});
