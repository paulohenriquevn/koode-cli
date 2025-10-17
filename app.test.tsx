import React from 'react';
import {describe, it, expect} from 'vitest';
import {render} from 'ink-testing-library';
import App from './source/app.js';

describe('App', () => {
	it('renders welcome message for default user', () => {
		const {lastFrame} = render(<App name={undefined} />);

		expect(lastFrame()).toContain('Koode CLI - AI Coding Assistant');
		expect(lastFrame()).toContain('Welcome to Koode CLI, User!');
	});

	it('renders welcome message for named user', () => {
		const {lastFrame} = render(<App name="Jane" />);

		expect(lastFrame()).toContain('Koode CLI - AI Coding Assistant');
		expect(lastFrame()).toContain('Welcome to Koode CLI, Jane!');
	});

	it('shows help instructions', () => {
		const {lastFrame} = render(<App name="Test" />);

		expect(lastFrame()).toContain('Press ESC to exit');
		expect(lastFrame()).toContain('Type /help for commands');
	});
});
