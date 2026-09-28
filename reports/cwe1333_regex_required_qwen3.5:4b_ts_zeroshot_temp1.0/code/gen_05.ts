import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let isValidCount = 0;

const validPattern = /^\s*(?:\d+(?:,\s*\d+)*)?\s*$/;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	
	if (trimmedLine.length === 0) {
		isValidCount++;
	} else if (validPattern.test(trimmedLine)) {
		isValidCount++;
	} else {
		// Invalid line
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${isValidCount}\n`);
});
