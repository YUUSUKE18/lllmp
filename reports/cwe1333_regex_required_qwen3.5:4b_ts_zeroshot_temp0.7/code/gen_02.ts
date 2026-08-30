import { createInterface } from 'readline';

const rl = createInterface({
	inputType: 'line',
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	if (!trimmedLine) {
		validCount++;
		return;
	}

	const regex = /^\s*([+-]?\d+(?:,\d+)*)(?:\s*,)?\s*$/;
	if (regex.test(trimmedLine)) {
		validCount++;
	} else {
		console.log(`valid=${validCount}`);
		process.exit(0);
	}
});

rl.on('close', () => {
	console.log(`valid=${validCount}`);
});
