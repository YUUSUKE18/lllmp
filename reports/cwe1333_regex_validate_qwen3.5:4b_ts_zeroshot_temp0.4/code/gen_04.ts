import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	if (trimmed.length === 0) {
		validCount++;
		return;
	}

	const parts = trimmed.split(',');
	for (const part of parts) {
		if (!/^-?\d+$/.test(part)) {
			validCount--;
			break;
		}
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
