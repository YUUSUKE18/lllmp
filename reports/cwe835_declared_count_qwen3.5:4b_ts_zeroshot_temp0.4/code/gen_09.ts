import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let countInput: string | undefined;
let totalSum: bigint = 0n;
let actualCount: number = 0;

rl.on('line', (line) => {
	if (!countInput) {
		countInput = line.trim();
		return;
	}

	const parts = line.trim().split(/\s+/);
	for (const p of parts) {
		const num = BigInt(p);
		if (num >= 0n && num <= Number.MAX_SAFE_INTEGER * 2n) {
			totalSum += num;
			actualCount++;
		}
	}

	if (countInput !== undefined) {
		countInput = undefined;
	}
});

rl.on('close', () => {
	process.stdout.write(`count=${actualCount} sum=${totalSum}\n`);
});
