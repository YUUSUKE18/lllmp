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
	let isValid = false;
	for (const part of parts) {
		if (/[^0-9]/.test(part)) {
			isValid = false;
			break;
		} else if (!part.length) {
			isValid = false;
			break;
		}
	}

	if (isValid) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
