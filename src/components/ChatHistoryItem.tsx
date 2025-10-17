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
					<Text bold color={theme.p90Header}>
						p90
					</Text>
					<Text color={theme.p90Text}>
						{messageText}
						<Newline />
					</Text>
				</Box>
			);
		case 'tool':
			return (
				<Box flexDirection="column" paddingX={6}>
					<Text bold color={theme.toolHeader}>
						{`tool - ${message.p90_metadata.tool_cli_display_name}`}
					</Text>
					<Text color={theme.toolText}>
						{message.p90_metadata.tool_cli_display_output ||
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
