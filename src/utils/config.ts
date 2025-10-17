import fs from 'fs';
import path from 'path';
import os from 'os';

const defaultConfig = {
	model: 'anthropic/claude-sonnet-4',
	temperature: 0.7,
	top_p: 1.0,
	top_k: 0,
	frequency_penalty: 0.0,
	presence_penalty: 0.0,
	repetition_penalty: 1.0,
	min_p: 0.0,
	top_a: 0.0,
	openrouter_api_key: '',
} as const;

export type Config = typeof defaultConfig;

export const CLI_DIR = path.join(os.homedir(), '.koode-cli');
export const CONFIG_PATH = path.join(CLI_DIR, 'config.json');

/**
 * Loads configuration from ~/.koode-cli/config.json
 * Creates the config file with defaults if it doesn't exist.
 */
export function getConfig(): Config {
	try {
		const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
		const config = JSON.parse(configData);
		return {...defaultConfig, ...config};
	} catch {
		initConfig();
		return {...defaultConfig};
	}
}

export function initConfig(): void {
	// Ensure the config directory exists
	fs.mkdirSync(CLI_DIR, {recursive: true});

	// Write the default config if it doesn't exist
	if (!fs.existsSync(CONFIG_PATH)) {
		fs.writeFileSync(CONFIG_PATH, JSON.stringify(defaultConfig, null, 2));
	}
}
