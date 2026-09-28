import * as readline from 'readline';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const memo = new Map<number, number>();

function calculateStepCount(n: number): number {
	if (n === 1) {
		return 0;
	}
	
	const key = n;
	if (memo.has(key)) {
		return memo.get(key)!;
	}

	let steps = 0;
	while (n !== 1) {
		if (n % 2 === 0) {
			n = n / 2;
		} else {
			n = 3 * n + 1;
		}
		steps++;
	}

	const result = steps;
	memo.set(key, result);
	return result;
}

function parseInput() {
	const lines: string[] = [];
	let line: string | null;
	
	while ((line = rl.nextLine()) !== null) {
		if (line.trim() === '') continue;
		const parsed = parseInt(line.trim());
		if (!isNaN(parsed)) {
			lines.push(String(parsed));
		} else {
			console.log(`Invalid input line: ${line}`);
		}
	}

	return lines;
}

function main() {
	const queries = parseInput();
	let totalSteps = 0;

	for (const query of queries) {
		if (!query || isNaN(Number(query))) continue;
		totalSteps += calculateStepCount(parseInt(query));
	}

	console.log(`total=${totalSteps}`);
}

main();
