import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', (line) => {
	if (!line.trim()) return;

	const target = parseInt(line.trim(), 10);
	if (isNaN(target)) {
		return;
	}

	let count = 0;
	const seen = new Map<number, number>(); // value -> index
	let first = false;

	for (const line of process.stdin) {
		const parts = line.split(/\s+/);
		for (const p of parts) {
			if (!p.trim()) continue;
			const num = parseInt(p, 10);
			if (isNaN(num)) continue;

			const complement = target - num;
			if (seen.has(complement)) {
				count++;
			}
			seen.set(num, true);
		}
	}

	console.log(`pairs=${count}`);
});
