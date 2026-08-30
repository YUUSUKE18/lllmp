import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: number | null = null;

rl.on('line', (line) => {
	if (targetValue === null) {
		const trimmed = line.trim();
		if (trimmed.length > 0 && !isNaN(Number(trimmed))) {
			targetValue = Number(trimmed);
		}
		return;
	}

	const parts = line.trim().split(/\s+/);
	for (const part of parts) {
		if (!isNaN(Number(part))) {
			const num = Number(part);
			let found = false;
			for (let i = 0; i < numbers.length; i++) {
				if (numbers[i] + num === targetValue && i !== numbers.indexOf(num)) {
					found = true;
					break;
				}
			}
			if (found) {
				count++;
			}
		}
	}
});

rl.on('close', () => {
	console.log(`pairs=${count}`);
});

const numbers: number[] = [];
let count = 0;
