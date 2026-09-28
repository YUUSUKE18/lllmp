import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	if (!trimmed) {
		validCount++;
		return;
	}

	const parts = trimmed.split(',');
	const allValid = parts.every((part) => /^\s*-\d+\s*$/.test(part));

	if (allValid && parts.length > 0) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
