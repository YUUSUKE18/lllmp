import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	
	if (trimmed.length === 0) {
		validCount++;
		return;
	}
	
	const parts = trimmed.split(',').map(s => s.trim());
	
	if (parts.every(p => /^\d+$/.test(p))) {
		if (parts.length > 0 || (parts.length === 0 && trimmed.endsWith(','))) {
			validCount++;
		}
	}
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
