import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let count = 0;
let sum = BigInt(0);

rl.on('line', (line) => {
	const parts = line.split(',').map((p) => p.trim());
	for (const part of parts) {
		if (!part) continue;
		const [valueStr, countStr] = part.split(':');
		if (!valueStr || !countStr) continue;
		const value = parseInt(valueStr, 10);
		const c = parseInt(countStr, 10);
		if (isNaN(value) || isNaN(c)) continue;
		if (c < 0) continue;
		count += c;
		sum += BigInt(value) * BigInt(c);
	}
});

rl.on('close', () => {
	console.log(`count=${count} sum=${sum}`);
});
