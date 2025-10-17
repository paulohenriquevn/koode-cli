#!/usr/bin/env node
import {startKoodeCLI} from './init-simple.js';

startKoodeCLI().catch((error: any) => {
	console.error('Failed to start koode-cli:', error);
	process.exit(1);
});
