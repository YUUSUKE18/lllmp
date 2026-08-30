import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.on('line', (line) => {
	const tokens = line.trim().split(',').map((t) => parseInt(t.trim(), 10)).filter((n) => !isNaN(n));
	
	if (tokens.length === 0) {
		console.log(`count=0 sum=0\n`);
		return;
	}

	const uniqueValues = new Set<number>();
	for (const val of tokens) {
		uniqueValues.add(val);
	}
	
	let count = uniqueValues.size;
	let sum = 0;
	for (const v of uniqueValues) {
		sum += v;
	}

	console.log(`count=${count} sum=${sum}\n`);
});
