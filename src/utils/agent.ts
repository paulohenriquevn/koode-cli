import {randomUUID} from 'node:crypto';
import {getConfig} from './config';
import {Message, Tool} from '../models/message';

export async function chat(
	messages: Message[],
	tools: Tool[],
): Promise<Message> {
	const response = await fetch(
		'https://openrouter.ai/api/v1/chat/completions',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${getConfig().openrouter_api_key}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model: getConfig().model,
				messages: messages.map(m => ({
					...m,
					p90_metadata: undefined,
				})),
				stream: false,
				tool_choice: 'auto',
				tools: tools,
			}),
		},
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	const choice = data.choices[0];
	const assistantMessage: Message = {
		...choice.message,
		p90_metadata: {message_id: randomUUID().toString()},
	};

	return assistantMessage;
}
