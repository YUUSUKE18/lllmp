import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	if (!trimmed || !/^[0-9]+(,[0-9]+)*$/.test(trimmed)) {
		return;
	}
	validCount++;
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
