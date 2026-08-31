import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let count = 0n;
let sum = 0n;

rl.on('line', (line) => {
	const parts = line.split(',').map((p) => p.trim()).filter(Boolean);
	for (const part of parts) {
		const match = part.match(/^(\d+):(\d+)$/);
		if (!match) continue;
		const value = BigInt(match[1]);
		const times = BigInt(match[2]);
		count += times;
		sum += value * times;
	}
});

rl.on('close', () => {
	process.stdout.write(`count=${count} sum=${sum}\n`);
});
