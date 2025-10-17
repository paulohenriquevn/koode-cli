export function getDefaultCLIDisplayOutput(result: any): string {
	if (!result || typeof result !== 'object') {
		return String(result);
	}

	const keys = Object.keys(result);
	const lines: string[] = [];
	const maxKeys = 4;

	for (let i = 0; i < Math.min(keys.length, maxKeys); i++) {
		const key = keys[i];
		const value = result[key];
		let displayValue: string;

		if (value === null) {
			displayValue = 'null';
		} else if (value === undefined) {
			displayValue = 'undefined';
		} else if (Array.isArray(value)) {
			displayValue = '[array]';
		} else if (typeof value === 'object') {
			displayValue = '[object]';
		} else if (typeof value === 'string') {
			// Replace newlines with spaces and truncate
			const cleanedValue = value.replace(/\n/g, ' ');
			displayValue =
				cleanedValue.length > 70
					? cleanedValue.substring(0, 70) + '...'
					: cleanedValue;
		} else {
			displayValue = String(value);
		}

		lines.push(`${key}: ${displayValue}`);
	}

	if (keys.length > maxKeys) {
		lines.push('[...]');
	}

	return lines.length === 0 ? '<no output>' : lines.join('\n');
}

export function formatForCLI(output: string, maxLineCount: number): string {
	if (!output) {
		return '<no output>';
	}

	// Split by existing newlines first
	const inputLines = output.split('\n');
	const wrappedLines: string[] = [];

	// Wrap each line at 70 characters
	for (const line of inputLines) {
		if (line.length <= 70) {
			wrappedLines.push(line);
		} else {
			// Break long lines into chunks of 70 characters
			for (let i = 0; i < line.length; i += 70) {
				wrappedLines.push(line.substring(i, i + 70));
			}
		}
	}

	// Check if we need to truncate
	if (wrappedLines.length <= maxLineCount) {
		return wrappedLines.join('\n');
	}

	// Take only the first maxLineCount lines and append [...]
	const truncatedLines = wrappedLines.slice(0, maxLineCount);
	truncatedLines.push('[...]');

	return truncatedLines.join('\n');
}
