import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;
const validPattern = /^\s*(\d+(?:,\d+)*)?\s*$/;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	
	if (trimmedLine === '') {
		validCount++;
	} else if (validPattern.test(trimmedLine)) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
