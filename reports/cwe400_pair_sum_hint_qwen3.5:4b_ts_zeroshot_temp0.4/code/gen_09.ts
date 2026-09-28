import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: bigint | null = null;
let numbers: number[] = [];

rl.on('line', (line) => {
	if (targetValue === null && line.trim() !== '') {
		targetValue = BigInt(line.trim());
	} else if (targetValue !== null && line.trim() !== '') {
		const trimmed = line.trim();
		if (/^-?\d+$/.test(trimmed)) {
			numbers.push(parseInt(trimmed, 10));
		}
	}
});

rl.on('close', () => {
	let count = 0n;
	if (targetValue !== null && numbers.length >= 2) {
		const n = numbers.length;
		for (let i = 0; i < n; i++) {
			const valI = BigInt(numbers[i]);
			for (let j = i + 1; j < n; j++) {
				if (valI + BigInt(numbers[j]) === targetValue) {
					count++;
				}
			}
		}
	}
	process.stdout.write(`pairs=${count}\n`);
});
