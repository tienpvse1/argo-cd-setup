import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	test: {
		include: ['**/*.int-spec.ts'],
		globals: true,
		root: './',
	},
	plugins: [swc.vite(), tsconfigPaths()],
});
