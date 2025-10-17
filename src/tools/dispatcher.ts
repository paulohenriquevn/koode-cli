import {randomUUID} from 'node:crypto';
import {shellSchema, shellCommand} from './shell';
import {getDefaultCLIDisplayOutput} from './utils';
import {Message, Tool, ToolCall} from '../models/message';
import {log} from '../utils/log';

export async function dispatchTool(toolCall: ToolCall): Promise<Message> {
	log.info(`dispatchTool called`, toolCall);

	const toolName = toolCall.function.name;
	const args = JSON.parse(toolCall.function.arguments) as any;
	const toolResponse = await toolMapping[toolName](args);

	const koode_metadata = toolResponse.koode_metadata || {};
	delete toolResponse.koode_metadata;

	return {
		role: 'tool',
		tool_call_id: toolCall.id,
		name: toolName,
		content: JSON.stringify(toolResponse),
		koode_metadata: {
			// Set defaults if `koode_metadata` is not provided.
			tool_cli_display_name: toolName,
			tool_cli_display_output: getDefaultCLIDisplayOutput(toolResponse),
			...koode_metadata,
			message_id: randomUUID().toString(),
		},
	};
}

export function getToolSchemas(): Tool[] {
	return [shellSchema];
}

const toolMapping: Record<string, (args: any) => Promise<any>> = {
	[shellSchema.function.name]: shellCommand,
};
