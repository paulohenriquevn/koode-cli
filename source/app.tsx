import React, {useState, useEffect} from 'react';
import {Box, Text, useInput, useApp} from 'ink';
import {OpenAI} from 'openai';

type Props = {
	readonly name: string | undefined;
	readonly apiKey?: string;
};

type Message = {
	role: 'user' | 'assistant';
	content: string;
};

export default function App({name = 'User', apiKey}: Props) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const {exit} = useApp();

	const openai = apiKey ? new OpenAI({apiKey}) : null;

	useInput((input, key) => {
		if (key.escape) {
			exit();
		}
		
		if (key.return) {
			if (input.trim()) {
				handleUserInput(input.trim());
				setInput('');
			}
		} else if (key.backspace || key.delete) {
			setInput(prev => prev.slice(0, -1));
		} else if (input.length === 1 && input >= ' ') {
			setInput(prev => prev + input);
		}
	});

	const handleUserInput = async (userInput: string) => {
		if (userInput === '/help') {
			showHelp();
			return;
		}

		if (userInput === '/clear') {
			setMessages([]);
			return;
		}

		if (userInput === '/exit') {
			exit();
			return;
		}

		if (!openai) {
			setError('OpenAI API key not provided. Use --api-key flag or set OPENAI_API_KEY environment variable.');
			return;
		}

		const newUserMessage: Message = {role: 'user', content: userInput};
		setMessages(prev => [...prev, newUserMessage]);
		setIsLoading(true);
		setError(null);

		try {
			const response = await openai.chat.completions.create({
				model: 'gpt-4',
				messages: [
					{
						role: 'system',
						content: 'You are a helpful coding assistant. Provide clear, concise, and practical coding advice.'
					},
					...messages.map(msg => ({role: msg.role, content: msg.content})),
					{role: 'user', content: userInput}
				],
				max_tokens: 1000,
			});

			const assistantMessage: Message = {
				role: 'assistant',
				content: response.choices[0]?.message?.content || 'No response received.'
			};

			setMessages(prev => [...prev, assistantMessage]);
		} catch (error) {
			setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

	const showHelp = () => {
		const helpMessage: Message = {
			role: 'assistant',
			content: `Koode CLI - AI-powered coding assistant

Available commands:
/help  - Show this help message
/clear - Clear conversation history
/exit  - Exit the application

You can also use ESC key to exit.

Type your coding questions or requests and get AI-powered assistance!`
		};
		setMessages(prev => [...prev, helpMessage]);
	};

	useEffect(() => {
		const welcomeMessage: Message = {
			role: 'assistant',
			content: `Welcome to Koode CLI, ${name}! 🚀

I'm your AI-powered coding assistant. Ask me anything about programming, code review, debugging, or general development questions.

Type /help for available commands or start asking questions!`
		};
		setMessages([welcomeMessage]);
	}, [name]);

	return (
		<Box flexDirection="column" padding={1}>
			<Text bold color="cyan">
				Koode CLI - AI Coding Assistant
			</Text>
			<Text color="gray">
				Press ESC to exit • Type /help for commands
			</Text>
			<Box marginY={1} flexDirection="column">
				{messages.map((message, index) => (
					<Box key={index} marginBottom={1}>
						<Text color={message.role === 'user' ? 'green' : 'blue'} bold>
							{message.role === 'user' ? '> ' : '🤖 '}
						</Text>
						<Text>{message.content}</Text>
					</Box>
				))}
				{isLoading && (
					<Box>
						<Text color="yellow">🤖 Thinking...</Text>
					</Box>
				)}
				{error && (
					<Box>
						<Text color="red">❌ {error}</Text>
					</Box>
				)}
			</Box>
			<Box>
				<Text color="green">{'> '}</Text>
				<Text>{input}</Text>
				<Text color="gray">█</Text>
			</Box>
		</Box>
	);
}
