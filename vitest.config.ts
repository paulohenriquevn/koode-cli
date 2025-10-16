// eslint-disable-next-line n/file-extension-in-import
import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
		exclude: ['node_modules', 'dist'],
		setupFiles: [],
	},
	esbuild: {
		target: 'node16',
	},
});
