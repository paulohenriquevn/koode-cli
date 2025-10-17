// Modified from https://github.com/openai/codex/blob/515b6331bd1fcaf8dea55645c5e866ad7bc14b16/codex-cli/src/utils/terminal.ts#L1
import type {Instance} from 'ink';
import type React from 'react';
import {useCallback} from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inkRenderer: Instance | null = null;

// Global render waiting system
const renderWaiters = new Set<() => void>();

function notifyRenderWaiters() {
	renderWaiters.forEach(resolve => resolve());
	renderWaiters.clear();
}

export function setInkRenderer(renderer: Instance): void {
	inkRenderer = renderer;

	// Monkey‑patch the public rerender/unmount methods
	const origRerender = renderer.rerender.bind(renderer);
	renderer.rerender = (node: React.ReactNode) => {
		const result = origRerender(node);

		// Notify render waiters
		notifyRenderWaiters();

		return result;
	};

	const origClear = renderer.clear.bind(renderer);
	renderer.clear = () => {
		const result = origClear();

		// Notify render waiters
		notifyRenderWaiters();

		return result;
	};
}

// Hook for waiting for renders
export function useWaitForRender() {
	return useCallback((timeout = 1000): Promise<void> => {
		return new Promise<void>(resolve => {
			const timeoutId = setTimeout(() => {
				renderWaiters.delete(resolve);
				resolve();
			}, timeout);

			const wrappedResolve = () => {
				clearTimeout(timeoutId);
				resolve();
			};

			renderWaiters.add(wrappedResolve);
		});
	}, []);
}
