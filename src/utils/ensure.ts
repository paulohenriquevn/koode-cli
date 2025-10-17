export function ensure(condition: any, ...args: any[]): asserts condition {
	if (!condition) {
		const message =
			args.length !== 0
				? args.map((x: any) => serialize(x)).join('\n')
				: '';
		throw new Error(message);
	}
}

export function serialize(object: any) {
	const serializedSpacing = 4; // Use four spaces when printing.
	return JSON.stringify(object, replacer, serializedSpacing);
}

function replacer(key: any, value: any) {
	// Add more usual javascript built-ins as they come up.
	if (value instanceof Set) {
		return [...value];
	} else if (value instanceof Map) {
		return [...value.entries()];
	} else {
		return value;
	}
}
