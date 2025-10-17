// Status Management System for koode-cli
// Inspired by José CLI patterns

import {createRequire} from 'module';

// Status levels
export enum StatusLevel {
	DEBUG = 'debug',
	INFO = 'info',
	WARN = 'warn',
	ERROR = 'error',
	SUCCESS = 'success',
}

// Status category filters
export enum DevToolCategory {
	SYSTEM = 'system',
	USER = 'user',
	AI = 'ai',
	TOOL = 'tool',
	API = 'api',
	FILE = 'file',
}

// Global status state
interface GlobalStatusState {
	isDebugMode: boolean;
	isVerboseMode: boolean;
	currentOperation: string | null;
	operationStartTime: number | null;
	stats: {
		totalOperations: number;
		successfulOperations: number;
		failedOperations: number;
		totalDuration: number;
	};
	debugFilter: string[] | null;
	enabledCategories: Set<DevToolCategory>;
}

class DevToolManager {
	private state: GlobalStatusState;
	private startTime: number;

	constructor() {
		this.startTime = Date.now();
		this.state = {
			isDebugMode:
				process.env.DEBUG === 'true' ||
				process.argv.includes('--debug'),
			isVerboseMode:
				process.env.VERBOSE === 'true' ||
				process.argv.includes('--verbose'),
			currentOperation: null,
			operationStartTime: null,
			stats: {
				totalOperations: 0,
				successfulOperations: 0,
				failedOperations: 0,
				totalDuration: 0,
			},
			debugFilter: this.parseDebugFilter(),
			enabledCategories: new Set(Object.values(DevToolCategory)),
		};
	}

	// Parse debug filter from environment or CLI args
	private parseDebugFilter(): string[] | null {
		const debugArg = process.argv.find(arg => arg.startsWith('--debug='));
		if (debugArg) {
			const filter = debugArg.split('=')[1];
			return filter.split(',').map(f => f.trim());
		}
		return null;
	}

	// Check if message should be logged based on filters
	private shouldLog(category: DevToolCategory, message: string): boolean {
		if (!this.state.enabledCategories.has(category)) return false;

		if (this.state.debugFilter) {
			return this.state.debugFilter.some(
				filter =>
					category.includes(filter) ||
					message.toLowerCase().includes(filter),
			);
		}

		return true;
	}

	// Core logging function with color support
	private logWithStyle(
		level: StatusLevel,
		category: DevToolCategory,
		message: string,
		data?: any,
	): void {
		if (!this.shouldLog(category, message)) return;

		const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
		const elapsed = Date.now() - this.startTime;

		// Style configuration inspired by José CLI
		const styles = {
			[StatusLevel.DEBUG]: {color: '\x1b[90m', prefix: '[DEBUG]'}, // Gray
			[StatusLevel.INFO]: {color: '\x1b[36m', prefix: '[INFO]'}, // Cyan
			[StatusLevel.WARN]: {color: '\x1b[33m', prefix: '[WARN]'}, // Yellow
			[StatusLevel.ERROR]: {color: '\x1b[31m', prefix: '[ERROR]'}, // Red
			[StatusLevel.SUCCESS]: {color: '\x1b[32m', prefix: '[SUCCESS]'}, // Green
		};

		const reset = '\x1b[0m';
		const dim = '\x1b[2m';
		const style = styles[level];

		const prefix = `${style.color}${style.prefix}${reset}`;
		const categoryTag = `${dim}[${category.toUpperCase()}]${reset}`;
		const timeTag = `${dim}${timestamp} (+${elapsed}ms)${reset}`;

		const formattedMessage = `${prefix} ${categoryTag} ${timeTag} ${message}`;

		// Output similar to José CLI patterns
		if (level === StatusLevel.ERROR) {
			this.writeToStderr(formattedMessage);
			if (data)
				this.writeToStderr(
					`${dim}Data: ${JSON.stringify(data, null, 2)}${reset}`,
				);
		} else {
			this.writeToStdout(formattedMessage);
			if (data && this.state.isVerboseMode) {
				this.writeToStdout(
					`${dim}Data: ${JSON.stringify(data, null, 2)}${reset}`,
				);
			}
		}
	}

	// Output functions inspired by José CLI
	private writeToStdout(text: string): void {
		// Chunk large outputs like José CLI does
		for (let i = 0; i < text.length; i += 2000) {
			process.stdout.write(text.substring(i, i + 2000));
		}
		process.stdout.write('\n');
	}

	private writeToStderr(text: string): void {
		// Chunk large outputs like José CLI does
		for (let i = 0; i < text.length; i += 2000) {
			process.stderr.write(text.substring(i, i + 2000));
		}
		process.stderr.write('\n');
	}

	// Public API methods
	public debug(category: DevToolCategory, message: string, data?: any): void {
		if (!this.state.isDebugMode) return;
		this.logWithStyle(StatusLevel.DEBUG, category, message, data);
	}

	public info(category: DevToolCategory, message: string, data?: any): void {
		this.logWithStyle(StatusLevel.INFO, category, message, data);
	}

	public warn(category: DevToolCategory, message: string, data?: any): void {
		this.logWithStyle(StatusLevel.WARN, category, message, data);
	}

	public error(category: DevToolCategory, message: string, data?: any): void {
		this.logWithStyle(StatusLevel.ERROR, category, message, data);
		this.state.stats.failedOperations++;
	}

	public success(
		category: DevToolCategory,
		message: string,
		data?: any,
	): void {
		this.logWithStyle(StatusLevel.SUCCESS, category, message, data);
		this.state.stats.successfulOperations++;
	}

	// Operation tracking (inspired by José CLI telemetry)
	public startOperation(operationName: string): void {
		this.state.currentOperation = operationName;
		this.state.operationStartTime = Date.now();
		this.state.stats.totalOperations++;

		this.debug(
			DevToolCategory.SYSTEM,
			`Starting operation: ${operationName}`,
		);
	}

	public endOperation(success: boolean = true, message?: string): void {
		if (!this.state.currentOperation || !this.state.operationStartTime)
			return;

		const duration = Date.now() - this.state.operationStartTime;
		this.state.stats.totalDuration += duration;

		const operationName = this.state.currentOperation;
		this.state.currentOperation = null;
		this.state.operationStartTime = null;

		if (success) {
			this.success(
				DevToolCategory.SYSTEM,
				`Completed operation: ${operationName} (${duration}ms)${
					message ? ` - ${message}` : ''
				}`,
			);
		} else {
			this.error(
				DevToolCategory.SYSTEM,
				`Failed operation: ${operationName} (${duration}ms)${
					message ? ` - ${message}` : ''
				}`,
			);
		}
	}

	// Status reporting
	public getStats(): typeof this.state.stats {
		return {...this.state.stats};
	}

	public getCurrentOperation(): string | null {
		return this.state.currentOperation;
	}

	public isDebugEnabled(): boolean {
		return this.state.isDebugMode;
	}

	public enableDebug(): void {
		this.state.isDebugMode = true;
		this.info(DevToolCategory.SYSTEM, 'Debug mode enabled');
	}

	public disableDebug(): void {
		this.state.isDebugMode = false;
	}

	public enableVerbose(): void {
		this.state.isVerboseMode = true;
		this.info(DevToolCategory.SYSTEM, 'Verbose mode enabled');
	}

	// Category filtering
	public enableCategory(category: DevToolCategory): void {
		this.state.enabledCategories.add(category);
	}

	public disableCategory(category: DevToolCategory): void {
		this.state.enabledCategories.delete(category);
	}

	// Status summary (inspired by José CLI metrics)
	public printSummary(): void {
		const uptime = Date.now() - this.startTime;
		const stats = this.state.stats;

		this.info(DevToolCategory.SYSTEM, '📊 Session Summary:');
		this.info(DevToolCategory.SYSTEM, `⏱️  Uptime: ${uptime}ms`);
		this.info(
			DevToolCategory.SYSTEM,
			`🎯 Operations: ${stats.totalOperations}`,
		);
		this.info(
			DevToolCategory.SYSTEM,
			`✅ Successful: ${stats.successfulOperations}`,
		);
		this.info(
			DevToolCategory.SYSTEM,
			`❌ Failed: ${stats.failedOperations}`,
		);
		this.info(
			DevToolCategory.SYSTEM,
			`🚀 Total Duration: ${stats.totalDuration}ms`,
		);

		if (stats.totalOperations > 0) {
			const avgDuration = Math.round(
				stats.totalDuration / stats.totalOperations,
			);
			const successRate = Math.round(
				(stats.successfulOperations / stats.totalOperations) * 100,
			);
			this.info(
				DevToolCategory.SYSTEM,
				`📈 Avg Duration: ${avgDuration}ms`,
			);
			this.info(
				DevToolCategory.SYSTEM,
				`🎉 Success Rate: ${successRate}%`,
			);
		}
	}
}

// Global instance
const statusManager = new DevToolManager();

// Export convenience functions
export const status = {
	debug: (category: DevToolCategory, message: string, data?: any) =>
		statusManager.debug(category, message, data),
	info: (category: DevToolCategory, message: string, data?: any) =>
		statusManager.info(category, message, data),
	warn: (category: DevToolCategory, message: string, data?: any) =>
		statusManager.warn(category, message, data),
	error: (category: DevToolCategory, message: string, data?: any) =>
		statusManager.error(category, message, data),
	success: (category: DevToolCategory, message: string, data?: any) =>
		statusManager.success(category, message, data),

	startOperation: (name: string) => statusManager.startOperation(name),
	endOperation: (success?: boolean, message?: string) =>
		statusManager.endOperation(success, message),

	getStats: () => statusManager.getStats(),
	getCurrentOperation: () => statusManager.getCurrentOperation(),
	isDebugEnabled: () => statusManager.isDebugEnabled(),

	enableDebug: () => statusManager.enableDebug(),
	enableVerbose: () => statusManager.enableVerbose(),

	enableCategory: (category: DevToolCategory) =>
		statusManager.enableCategory(category),
	disableCategory: (category: DevToolCategory) =>
		statusManager.disableCategory(category),

	printSummary: () => statusManager.printSummary(),
};

export default statusManager;
