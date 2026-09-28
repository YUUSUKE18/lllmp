import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	if (trimmed === '') {
		validCount++;
		return;
	}

	const parts = trimmed.split(',');
	let isNumeric = true;

	for (const part of parts) {
		if (!part || !/^-?\d+$/.test(part)) {
			isNumeric = false;
			break;
		}
	}

	if (isNumeric) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
