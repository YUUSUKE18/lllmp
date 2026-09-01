import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let target: bigint | undefined;
let numbers: bigint[] = [];

rl.on('line', (line) => {
	if (!line.trim()) return;
	const trimmed = line.trim();
	if (trimmed === '') return;

	const parts = trimmed.split(/\s+/);
	for (const part of parts) {
		if (part === '') continue;
		const num = BigInt(part);
		if (target === undefined) {
			target = num;
		} else {
			numbers.push(num);
		}
	}
});

rl.on('close', () => {
	if (!target || numbers.length < 2) {
		console.log('pairs=0');
		return;
	}

	let count = 0n;
	const n = numbers.length;
	for (let i = 0n; i < n; i++) {
		for (let j = i + 1n; j < n; j++) {
			if (numbers[i] + numbers[j] === target) {
				count++;
			}
		}
	}

	console.log(`pairs=${count}`);
});
