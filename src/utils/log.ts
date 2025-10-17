/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as fs from 'fs';
import * as path from 'path';
import {CLI_DIR} from './config';
import {serialize} from './ensure';

const logFilePath = path.join(CLI_DIR, 'koode.log');

// Ensure the CLI_DIR exists
if (!fs.existsSync(CLI_DIR)) {
	fs.mkdirSync(CLI_DIR, {recursive: true});
}

// Remove old log file on startup
try {
	fs.unlinkSync(logFilePath);
} catch (err) {
	// Best attempt - ignore errors
}

export const log = Object.freeze({
	debug: (...args: any[]) => writeLog('DEBUG', ...args),
	info: (...args: any[]) => writeLog('INFO', ...args),
	warn: (...args: any[]) => writeLog('WARN', ...args),
	error: (...args: any[]) => writeLog('ERROR', ...args),
});

function writeLog(level: string, ...args: any[]): void {
	// Only write to log if DEBUG environment variable is set to true
	if (process.env.DEBUG !== 'true') {
		return;
	}

	const timestamp = new Date().toISOString();
	const msg = args.map(x => serialize(x)).join('\n');
	const logEntry = `[${timestamp}] [${level}] ${msg}\n`;

	try {
		fs.appendFileSync(logFilePath, logEntry, 'utf8');
	} catch (err) {
		// Best attempt.
	}
}
