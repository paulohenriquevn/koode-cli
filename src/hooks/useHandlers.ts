import {useCallback, useMemo} from 'react';
import {randomUUID} from 'node:crypto';
import {useWaitForRender} from './useWaitForNextRender';
import {getText, Message} from '../models/message';
import {CLIAction, CLIState} from '../reducers/cliReducer';
import {chat} from '../utils/agent';
import {dispatchTool, getToolSchemas} from '../tools/dispatcher';
import {log} from '../utils/log';

interface UseHandlerParams {
	state: CLIState;
	dispatch: React.ActionDispatch<[action: CLIAction]>;
}

export function useHandlers({state, dispatch}: UseHandlerParams) {
	const waitForRender = useWaitForRender();

	const handleSubmit = useCallback(
		async (input: string) => {
			const userMessage: Message = {
				koode_metadata: {
					message_id: randomUUID().toString(),
				},
				role: 'user',
				content: [{type: 'text', text: input}],
			};

			dispatch({
				type: 'ADD_MESSAGE',
				payload: userMessage,
			});
			logMessage(userMessage);

			const messages = [...state.messages, userMessage];

			// Keep iterating until we get a final response from the assistant.
			let assistantMessage: Message | null = null;
			do {
				assistantMessage = await chat(messages, getToolSchemas());

				dispatch({type: 'FREEZE_SCREEN'});
				await waitForRender(1000); // Wait for screen to stabilize

				messages.push(assistantMessage);
				dispatch({type: 'ADD_MESSAGE', payload: assistantMessage});
				logMessage(assistantMessage);

				// Process any tool calls in the assistant message.
				if (hasPendingToolCalls(assistantMessage)) {
					for (const toolCall of assistantMessage.tool_calls ?? []) {
						const toolResponseMessage = await dispatchTool(
							toolCall,
						);

						dispatch({type: 'FREEZE_SCREEN'});
						await waitForRender(1000);

						messages.push(toolResponseMessage);
						dispatch({
							type: 'ADD_MESSAGE',
							payload: toolResponseMessage,
						});
						logMessage(toolResponseMessage);
					}
				}
			} while (hasPendingToolCalls(assistantMessage));
		},
		[state.messages, dispatch],
	);

	const handlers = useMemo(
		() => ({
			handleSubmit,
		}),
		[handleSubmit],
	);

	return handlers;
}

function logMessage(message: Message) {
	const content = getText(message.content);
	const trimmed =
		content.length > 100 ? `${content.substring(0, 100)} [...]` : content;
	log.info(
		`Message ID: ${message.koode_metadata.message_id}, Role: ${message.role}, Content: "${trimmed}"`,
	);
}

function hasPendingToolCalls(message: Message): boolean {
	if (message.role !== 'assistant') {
		return false;
	}

	return Boolean(message.tool_calls && message.tool_calls.length > 0);
}
