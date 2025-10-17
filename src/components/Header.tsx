import {memo} from 'react';
import {Text, Box} from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import * as theme from '../utils/theme';

interface HeaderProps {
	cwd: string;
	model: string;
	hasApiKey: string;
	debug: boolean;
}

function Header({model, cwd, hasApiKey, debug}: HeaderProps) {
	return (
		<>
			<Gradient name={theme.p90Logo}>
				<BigText text="P90" />
			</Gradient>
			<Box
				flexDirection="column"
				paddingX={1}
				borderStyle="bold"
				borderColor={theme.borderColor}
			>
				<Text color={theme.p90Header}>model: {model}</Text>
				<Text color={theme.p90Header}>cwd: {cwd}</Text>
				<Text color={theme.p90Header}>
					api_key: {hasApiKey ? 'set' : 'unset'}
				</Text>
				{debug ? (
					<Text color={theme.p90Header}>debug: enabled</Text>
				) : undefined}
			</Box>
		</>
	);
}

export default memo(Header);
