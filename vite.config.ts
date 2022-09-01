import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import * as fse from 'fs-extra';

const root = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue(), //
      {
         name: 'plugin:move-types',
         apply: 'build',
         async closeBundle() {
            const fileName = 'lib.d.ts';
            const libDTS = path.join(root, 'src', fileName);
            const distLibDTS = path.join(root, 'dist', fileName);
            await fse.copyFile(libDTS, distLibDTS);
         }
      }
   ],
   build: {
      target: 'es2020',
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
