import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue(), //
      dts({
         outputDir: 'dist/types',
         include: ['src']
      })
   ],
   build: {
      target: 'es2020',
      lib: {
         entry: path.resolve(root, 'src', 'lib.ts'),
         name: 'SimpleBarVue3',
         formats: ['es', 'umd', 'iife']
      },
      rollupOptions: {
         external: ['vue', 'simplebar'],
         output: {
            globals: {
               vue: 'Vue',
               simplebar: 'SimpleBar'
            }
         }
      }
   }
});
