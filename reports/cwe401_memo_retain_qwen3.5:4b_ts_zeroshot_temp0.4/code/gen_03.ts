import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const memo = new Map<number, number>();

function calculateSteps(n: number): number {
	if (n === 1) return 0;
	const prev = memo.get(n);
	if (prev !== undefined) return prev;
	
	let steps = 0;
	while (n !== 1) {
		n = n % 2 === 0 ? n / 2 : 3 * n + 1;
		steps++;
	}
	memo.set(n, steps);
	return steps;
}

let totalSteps = 0;

rl.on('line', (line) => {
	const trimmed = line.trim();
	if (!trimmed) return;
	
	const num = parseInt(trimmed, 10);
	if (isNaN(num)) return;

	totalSteps += calculateSteps(num);
});

rl.on('close', () => {
	console.log(`total=${totalSteps}`);
});
