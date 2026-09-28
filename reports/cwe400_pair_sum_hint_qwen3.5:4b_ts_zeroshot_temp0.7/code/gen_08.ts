const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let targetValue: bigint;
const data: number[] = [];

rl.on('line', (line) => {
	if (!line || /^\s*$/.test(line)) return;
	const trimmedLine = line.trim();
	if (trimmedLine === '') return;

	const parsed = parseInt(trimmedLine, 10);
	if (Number.isNaN(parsed)) return;

	if (data.length === 0) {
		targetValue = BigInt(parsed);
	} else {
		data.push(parsed);
	}
});

rl.on('close', () => {
	let count: bigint = 0n;
	const n = data.length;

	for (let i = 0; i < n; i++) {
		const valI = BigInt(data[i]);
		const needed = targetValue - valI;

		for (let j = i + 1; j < n; j++) {
			if (BigInt(data[j]) === needed) {
				count++;
			}
		}
	}

	console.log(`pairs=${count}`);
});
