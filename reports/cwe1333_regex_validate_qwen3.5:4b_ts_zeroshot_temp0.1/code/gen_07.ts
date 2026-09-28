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
	let isCommaFree = true;
	for (const part of parts) {
		if (part.length === 0 || !/^-?\d+$/.test(part)) {
			isCommaFree = false;
			break;
		}
	}

	if (isCommaFree) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
