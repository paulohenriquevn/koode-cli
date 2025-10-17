export interface TextContent {
	type: 'text';
	text: string;
}

export interface ImageContent {
	type: 'image_url';
	image_url: {
		url: string;
		detail?: 'low' | 'high' | 'auto';
	};
}

export interface ToolUseContent {
	type: 'tool_use';
	id: string;
	name: string;
	input: Record<string, any>;
}

export interface ToolResultContent {
	type: 'tool_result';
	tool_use_id: string;
	content?: string;
	is_error?: boolean;
}

export type MessageContent =
	| TextContent
	| ImageContent
	| ToolUseContent
	| ToolResultContent;

export interface ToolCall {
	id: string;
	type: 'function';
	function: {
		name: string;
		arguments: string; // JSON string
	};
}

export interface FunctionDefinition {
	name: string;
	description?: string;
	parameters?: Record<string, any>; // JSON Schema
}

export interface Tool {
	type: 'function';
	function: FunctionDefinition;
}

export interface Message {
	role: 'user' | 'assistant' | 'system' | 'tool';
	content: MessageContent[] | string | null;
	name?: string; // Optional name for the participant
	tool_calls?: ToolCall[]; // For assistant messages that call tools
	tool_call_id?: string; // For tool role messages responding to a specific tool call
	koode_metadata: {
		message_id: string;
		tool_cli_display_name?: string;
		tool_cli_display_output?: string;
	};
}

// Usage types for the chat function
export interface ChatRequest {
	model: string;
	messages: Message[];
	tools?: Tool[];
	tool_choice?:
		| 'auto'
		| 'none'
		| 'required'
		| {type: 'function'; function: {name: string}};
	temperature?: number;
	max_tokens?: number;
	top_p?: number;
	frequency_penalty?: number;
	presence_penalty?: number;
	stop?: string | string[];
	stream?: boolean;
	user?: string;
}

export interface Usage {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens: number;
}

export interface ChatChoice {
	index: number;
	message: Message;
	finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | null;
}

export interface ChatResponse {
	id: string;
	object: 'chat.completion';
	created: number;
	model: string;
	choices: ChatChoice[];
	usage?: Usage;
}

// Streaming response types
export interface ChatStreamChoice {
	index: number;
	delta: Partial<Message>;
	finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | null;
}

export interface ChatStreamResponse {
	id: string;
	object: 'chat.completion.chunk';
	created: number;
	model: string;
	choices: ChatStreamChoice[];
}

export function getText(content: MessageContent[] | string | null) {
	if (!content) {
		return '<no response>';
	}

	if (typeof content === 'string') {
		return content;
	}

	return content
		.map(c => {
			if (typeof c === 'string') {
				return c;
			}
			return 'text' in c ? c.text : '';
		})
		.join('');
}
