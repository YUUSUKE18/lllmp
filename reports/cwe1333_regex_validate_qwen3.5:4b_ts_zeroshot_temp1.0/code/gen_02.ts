import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmedLine = line.trim();

	if (trimmedLine === '') {
		return;
	}

	if (!/^[0-9,\s]+$/.test(trimmedLine)) {
		return;
	}

	const parts = trimmedLine.split(',');
	
	let hasInvalidPart = false;
	for (const part of parts) {
		const trimmedPart = part.trim();
		if (!trimmedPart.match(/^[\d]+$/)) {
			hasInvalidPart = true;
			break;
		}
	}

	if (!hasInvalidPart && parts.length >= 1) {
		validCount++;
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
