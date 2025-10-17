import {memo} from 'react';
import {Box, Newline, Text} from 'ink';
import * as theme from '../utils/theme';
import {getText, Message} from '../models/message';

interface ChatHistoryItemProps {
	message: Message;
}

function ChatHistoryItem({message}: ChatHistoryItemProps) {
	const messageText = getText(message.content);

	switch (message.role) {
		case 'user':
			return (
				<Box flexDirection="column" paddingX={1}>
					<Text bold color={theme.userHeader}>
						user
					</Text>
					<Text color={theme.userText}>
						{messageText}
						<Newline />
					</Text>
				</Box>
			);
		case 'assistant':
			return (
				<Box flexDirection="column" paddingX={6}>
					<Text bold color={theme.koodeHeader}>
						koode
					</Text>
					<Text color={theme.koodeText}>
						{messageText}
						<Newline />
					</Text>
				</Box>
			);
		case 'tool':
			return (
				<Box flexDirection="column" paddingX={6}>
					<Text bold color={theme.toolHeader}>
						{`tool - ${message.koode_metadata.tool_cli_display_name}`}
					</Text>
					<Text color={theme.toolText}>
						{message.koode_metadata.tool_cli_display_output ||
							messageText}
						<Newline />
					</Text>
				</Box>
			);
		default:
			return <></>;
	}
}

export default memo(ChatHistoryItem);
