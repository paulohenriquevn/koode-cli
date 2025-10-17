import type {
	ChildProcess,
	SpawnOptionsWithStdioTuple,
	StdioNull,
	StdioPipe,
} from 'child_process';
import * as os from 'os';
import {spawn} from 'child_process';
import {formatForCLI} from './utils';
import {Tool} from '../models/message';
import {createTruncatingCollector} from '../utils/truncatingCollector';

export const shellSchema: Tool = {
	type: 'function',
	function: {
		name: 'shell',
		description: 'Runs a shell command, and returns its output.',
		parameters: {
			type: 'object',
			properties: {
				command: {
					type: 'string',
					description: 'The shell command to execute.',
				},
				workdir: {
					type: 'string',
					description: 'The working directory for the command.',
				},
				timeout: {
					type: 'number',
					description:
						'The maximum time to wait for the command to complete in milliseconds.',
				},
			},
			required: ['command'],
			additionalProperties: false,
		},
	},
};

interface ShellCommandArgs {
	command: string;
	workdir?: string;
	timeout?: number; // in milliseconds
}

// Modified from Codex CLI
export async function shellCommand(args: ShellCommandArgs): Promise<any> {
	const {command, workdir, timeout} = args;
	const commandName = command.split(' ')[0] ?? 'unknown';

	const options: SpawnOptionsWithStdioTuple<StdioNull, StdioPipe, StdioPipe> =
		{
			cwd: workdir || process.cwd(),
			timeout: timeout || 30000, // default to 30 seconds
			shell: true,

			// Inherit any caller‑supplied stdio flags but force stdin to "ignore" so
			// the child never attempts to read from us. Apparently it messes with ripgrep.
			stdio: ['ignore', 'pipe', 'pipe'],
			// Launch the child in its *own* process group so that we can later send a
			// single signal to the entire group – this reliably terminates not only
			// the immediate child but also any grandchildren it might have spawned
			// (think `bash -c "sleep 999"`).
			detached: true,
		};

	const trySpawn = (resolve: (value: unknown) => void) => {
		try {
			const child: ChildProcess = spawn(command, options);
			const stdoutCollector = createTruncatingCollector(child.stdout!);
			const stderrCollector = createTruncatingCollector(child.stderr!);

			child.on('exit', (code, signal) => {
				const stdout = stdoutCollector.getString();
				const stderr = stderrCollector.getString();

				return resolve({
					stdout: stdout,
					stderr: stderr,
					exit_code: getExitCode(code, signal),
					p90_metadata: {
						tool_cli_display_name: commandName,
						tool_cli_display_output: formatForCLI(
							stdout.trim() || stderr.trim(),
							4,
						),
					},
				});
			});
			child.on('error', err => {
				return resolve(getErrorResult(commandName, err));
			});
		} catch (error: unknown) {
			return resolve(getErrorResult(commandName, error));
		}
	};

	return new Promise(trySpawn);
}

function getErrorResult(commandName: string, error: unknown): any {
	return {
		stdout: '',
		stderr: String(error),
		exit_code: 1,
		p90_metadata: {
			tool_cli_display_name: commandName,
			tool_cli_display_output: formatForCLI(
				`Error executing command:\n${String(error)}`,
				4,
			),
		},
	};
}

function getExitCode(
	code: number | null,
	signal: NodeJS.Signals | null,
): number {
	// Map (code, signal) to an exit code. We expect exactly one of the two
	// values to be non-null, but we code defensively to handle the case where
	// both are null.
	let exitCode: number;
	if (code !== null) {
		exitCode = code;
	} else if (signal !== null && signal in os.constants.signals) {
		const signalNum =
			os.constants.signals[signal as keyof typeof os.constants.signals];
		exitCode = 128 + signalNum;
	} else {
		exitCode = 1;
	}

	return exitCode;
}
