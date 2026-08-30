import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	if (!trimmedLine) {
		validCount++;
		return;
	}

	const regex = /^\s*(\d+(?:,\d+)*)?\s*$/;
	if (regex.test(trimmedLine)) {
		validCount++;
	} else {
		console.error(`Invalid line: ${line}`);
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
