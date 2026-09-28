const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: bigint | null = null;
let inputQueue: string[] = [];

rl.on('line', (line) => {
	if (!targetValue && line.trim() !== '') {
		targetValue = BigInt(line.trim());
	} else if (targetValue !== null && line.trim() !== '') {
		const parts = line.trim().split(/\s+/);
		for (const part of parts) {
			try {
				inputQueue.push(BigInt(part));
			} catch {
				// 整数として解釈できない行は無視
			}
		}
	}

	if (targetValue !== null && inputQueue.length > 0) {
		const count = solvePairs(targetValue, inputQueue);
		console.log(`pairs=${count}`);
		process.exit(0);
	}
});

function solvePairs(target: bigint, nums: bigint[]): number {
	let count = 0n;
	const n = nums.length;

	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (nums[i] + nums[j] === target) {
				count++;
			}
		}
	}

	return Number(count);
}
