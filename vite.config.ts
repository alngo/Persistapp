import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
	plugins: [sveltekit(), topLevelAwait()],
	worker: {
		plugins: [topLevelAwait()]
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary', 'json']
		}
	}
});
