import {randomUUID} from 'node:crypto';
import {Message} from '../models/message';
import {getSystemPrompt} from '../utils/systemPrompt';

export interface CLIState {
	/***
	 * Freeze screen is a bit of a hack/workaround.
	 * Freeze screen MUST stop all active animations and put the CLI in a stable, unmoving state.
	 * This is so the next message can be processed and properly paint without being lost.
	 * For example, if there is a "thinking" animation going on, and we attempt to add a new message,
	 * it can be "lost" and not drawn because the "thinking" animation writes over it.
	 * If new animations are added in the future, they must also respect this state.
	 */
	freezeScreen: boolean;
	messages: Message[];
}

export type CLIAction =
	| {
			type: 'ADD_MESSAGE';
			payload: Message;
	  }
	| {type: 'FREEZE_SCREEN'};

export function getInitialState(): CLIState {
	return {
		freezeScreen: false,
		messages: [
			{
				role: 'system',
				content: [{type: 'text', text: getSystemPrompt()}],
				p90_metadata: {
					message_id: randomUUID().toString(),
				},
			},
		],
	};
}

export function cliReducer(state: CLIState, action: CLIAction): CLIState {
	switch (action.type) {
		case 'ADD_MESSAGE':
			return {
				...state,
				freezeScreen: false,
				messages: [...state.messages, action.payload],
			};
		case 'FREEZE_SCREEN':
			return {...state, freezeScreen: true};
		default:
			return state;
	}
}
