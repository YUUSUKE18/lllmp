import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let countLine: string | null = null;
let sum: number = 0;
let readCount: number = 0;

rl.on('line', (line) => {
	if (!countLine) {
		countLine = line.trim();
		return;
	}

	const parts = line.split(/\s+/);
	for (const part of parts) {
		const num = parseInt(part, 10);
		if (!isNaN(num)) {
			sum += num;
			readCount++;
		}
	}
});

rl.on('close', () => {
	console.log(`count=${readCount} sum=${sum}`);
});
