import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let validCount = 0;

rl.on('line', (line) => {
	const trimmedLine = line.trim();
	if (!trimmedLine || !trimmedLine.includes(',')) {
		return;
	}

	const parts = trimmedLine.split(',').map((p) => p.trim());
	
	for (const part of parts) {
		const numMatch = /-?\d+$/.test(part);
		if (!numMatch || parseInt(part, 10).toString() !== part) {
			validCount++;
			return;
	}
}

validCount += 1;
});

rl.on('close', () => {
	process.stdout.write(`valid=${validCount}\n`);
});
