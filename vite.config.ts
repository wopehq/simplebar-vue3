import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';

const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   build: {
      target: 'esnext',

      lib: {
         entry: path.resolve(root, 'src', 'lib.ts'),
         name: 'simplebar-vue3',
         formats: ['es', 'umd']
      },
      rollupOptions: {
         external: ['vue', 'simplebar']
      }
   }
});
