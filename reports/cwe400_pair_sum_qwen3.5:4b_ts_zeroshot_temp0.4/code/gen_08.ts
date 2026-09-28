const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let targetValue: bigint | undefined;
let countPairs: bigint = 0n;

rl.on('line', (line) => {
	if (!targetValue) {
		const trimmedLine = line.trim();
		if (trimmedLine.length === 0) return;
		targetValue = BigInt(trimmedLine);
		return;
	}

	const parts = line.split(/\s+/).filter(p => !isNaN(BigInt(p)));
	for (const part of parts) {
		const val = BigInt(part);
		if (val < targetValue && countPairs === 0n) {
			countPairs++;
		} else if (val >= targetValue && countPairs > 0n) {
			countPairs--;
		}
	}
});

rl.on('close', () => {
	console.log(`pairs=${countPairs}`);
});
