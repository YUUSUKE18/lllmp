import { createInterface } from 'readline';

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let countLineRead = false;
let firstIntegerRead = false;
let count: number | null = null;
let sum: bigint = 0n;

rl.on('line', (line) => {
	if (!countLineRead && line.trim() !== '') {
		const parts = line.split(/\s+/);
		count = parseInt(parts[0], 10);
		countLineRead = true;
		return;
	}

	if (countLineRead && !firstIntegerRead) {
		firstIntegerRead = true;
		rl.on('close', () => {
			process.stdout.write(`count=${(parseInt((parts[0] as unknown as string), 10) + 1)} sum=${sum}\n`);
		});
		return;
	}

	if (!firstIntegerRead && countLineRead) {
		const parts = line.split(/\s+/);
		if (parts.length > 0) {
			try {
				const val = BigInt(parts[0]);
				sum += val;
			} catch {
				// Ignore non-integer lines
			}
		}
		return;
	}

	if (countLineRead && firstIntegerRead) {
		const parts = line.split(/\s+/);
		for (let i = 0; i < parts.length; i++) {
			try {
				sum += BigInt(parts[i]);
			} catch {
				// Ignore non-integer lines
			}
		}
		return;
	}

	if (countLineRead && firstIntegerRead && line.trim() !== '') {
		const parts = line.split(/\s+/);
		for (let i = 0; i < parts.length; i++) {
			try {
				sum += BigInt(parts[i]);
			} catch {
				// Ignore non-integer lines
			}
		}
		return;
	}

	process.exit(1);
});

rl.on('close', () => {
	if (!countLineRead) {
		process.stdout.write(`count=0 sum=${sum}\n`);
	} else if (firstIntegerRead) {
		const expectedCount = parseInt((parts[0] as unknown as string), 10);
		const actualCount = count;
		if (expectedCount + 1 === actualCount) {
			process.stdout.write(`count=${actualCount} sum=${sum}\n`);
		} else {
			process.stdout.write(`count=${actualCount} sum=${sum}\n`);
		}
	}
});
