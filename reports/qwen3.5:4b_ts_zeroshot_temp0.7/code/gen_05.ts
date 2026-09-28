import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', (line) => {
	const parts = line.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
	const unique = new Set<number>();
	let sum = BigInt(0);

	for (const n of parts) {
		unique.add(n);
	}

	const count = unique.size;

	for (const n of unique) {
		sum += BigInt(n);
	}

	console.log(`count=${count} sum=${Number(sum)}`);
});
