import meow from 'meow';
import {useReducer, useMemo} from 'react';
import {render, Box, Text, Static} from 'ink';
import {TextInput} from '@inkjs/ui';
import {spawnSync} from 'child_process';
import {cliReducer, CLIState, getInitialState} from './reducers/cliReducer';
import {CONFIG_PATH, getConfig, initConfig} from './utils/config';
import {useHandlers} from './hooks/useHandlers';
import ChatHistoryItem from './components/ChatHistoryItem';
import Header from './components/Header';
import {Message} from './models/message';
import {ensure} from './utils/ensure';
import LoadingText from './components/LoadingText';
import {setInkRenderer} from './hooks/useWaitForNextRender';
import * as theme from './utils/theme';

const config = getConfig();
const zeroWidthSpace = '\u200B'; // Used for invisible input

type View = 'UserInput' | 'AgentResponse' | 'ToolUse' | 'Default';

function CLI() {
	const [state, dispatch] = useReducer(cliReducer, getInitialState());
	const messages = useMemo(() => state.messages, [state.messages]);
	const {handleSubmit} = useHandlers({state, dispatch});
	const view: View = getView(state);

	return (
		<>
			<Static items={messages}>
				{message =>
					message.role === 'system' ? (
						<Header
							key="system-header"
							model={config.model}
							hasApiKey={config.openrouter_api_key}
							debug={cli.flags.debug}
							cwd={process.cwd()}
						/>
					) : (
						<ChatHistoryItem
							key={`${message.p90_metadata.message_id}`}
							message={message}
						/>
					)
				}
			</Static>
			<Box flexDirection="column" gap={1}>
				<Box
					borderStyle="bold"
					borderColor={theme.borderColor}
					paddingX={1}
				>
					{state.freezeScreen ? (
						<Text>{zeroWidthSpace}</Text>
					) : view === 'UserInput' ? (
						<TextInput onSubmit={handleSubmit} />
					) : view === 'ToolUse' ? (
						<LoadingText>Using tool</LoadingText>
					) : (
						<LoadingText>Thinking</LoadingText>
					)}
				</Box>
			</Box>
		</>
	);
}

function getView(state: CLIState): View {
	// Initital state, awaiting user input.
	if (state.messages.length === 1 && state.messages[0].role === 'system') {
		return 'UserInput';
	}

	const lastMessage: Message | undefined = state.messages.at(-1);
	ensure(lastMessage);

	// User has entered input and is waiting for the agent to respond.
	if (lastMessage.role === 'user') {
		return 'AgentResponse';
	}

	// Assistant has replied.
	if (lastMessage.role === 'assistant') {
		if (!lastMessage.tool_calls || lastMessage.tool_calls.length === 0) {
			return 'UserInput';
		} else {
			return 'ToolUse';
		}
	}

	return 'Default';
}

const cli = meow(
	`
  Usage
    $ p90
    $ p90 <flag>

  Options
    --version                       Print version and exit
    --debug                         Enable debug mode

    -h, --help                      Show usage and exit
    -c, --config                    Open the instructions file in your editor

  Examples
    $ p90
    $ p90 -c
`,
	{
		importMeta: import.meta,
		autoHelp: true,
		flags: {
			version: {type: 'boolean', description: 'Print version and exit'},
			debug: {
				type: 'boolean',
				description: 'Enable debug mode',
				default: false,
			},
			help: {type: 'boolean', aliases: ['h']},
			config: {
				type: 'boolean',
				aliases: ['c'],
				description: 'Open the config file in your editor',
			},
		},
	},
);

initConfig();
if (cli.flags.debug) {
	process.env.DEBUG = 'true';
}

if (cli.flags.config) {
	const editor =
		process.env['EDITOR'] ||
		(process.platform === 'win32' ? 'notepad' : 'vi');
	spawnSync(editor, [CONFIG_PATH], {stdio: 'inherit'});
	process.exit(0);
} else {
	const inkRenderer = render(<CLI />);
	setInkRenderer(inkRenderer);
}
