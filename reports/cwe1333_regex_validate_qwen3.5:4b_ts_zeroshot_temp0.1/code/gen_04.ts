import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	if (trimmedLine === '') {
		validCount++;
		return;
	}

	const parts = trimmedLine.split(',');
	let isInvalid = false;

	for (const part of parts) {
		if (!/^-?\d+$/.test(part)) {
			isInvalid = true;
			break;
		}
	}

	if (!isInvalid) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
