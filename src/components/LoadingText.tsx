// Slimmed down from: https://github.com/openai/codex/blob/515b6331bd1fcaf8dea55645c5e866ad7bc14b16/codex-cli/src/components/chat/terminal-chat-input-thinking.tsx#L10
import {Box, Text} from 'ink';
import {memo, useState} from 'react';
import {useInterval} from 'use-interval';

interface LoadingTextProps {
	children: React.ReactNode;
}

// Impl note: I would normally like to export all state into a `useThinking` hook, that the parent CLI component would manage.
// This would allow for better separation of concerns and keep `ThinkingText` pure and for rendering only.
// However, in an Ink CLI context, we need to be optimized for rendering purposes.
function LoadingText({children}: LoadingTextProps) {
	const [dots, setDots] = useState('');

	// Animate ellipsis
	useInterval(() => {
		setDots(prev => (prev.length < 3 ? prev + '.' : ''));
	}, 500);

	// Spinner frames with embedded seconds
	const ballFrames = [
		'( ●    )',
		'(  ●   )',
		'(   ●  )',
		'(    ● )',
		'(     ●)',
		'(    ● )',
		'(   ●  )',
		'(  ●   )',
		'( ●    )',
		'(●     )',
	];
	const [frame, setFrame] = useState(0);

	useInterval(() => {
		setFrame(idx => (idx + 1) % ballFrames.length);
	}, 80);

	// Keep the elapsed‑seconds text fixed while the ball animation moves.
	const frameTemplate = ballFrames[frame] ?? ballFrames[0];
	const frameWithSeconds = `${frameTemplate} `;

	return (
		<Box gap={2}>
			<Text>{frameWithSeconds}</Text>
			<Text>
				{children}
				{dots}
			</Text>
		</Box>
	);
}

export default memo(LoadingText);
