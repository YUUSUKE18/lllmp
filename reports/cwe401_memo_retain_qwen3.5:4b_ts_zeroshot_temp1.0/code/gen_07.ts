import * as fs from 'fs';

const memo = new Map<number, number>();

function collatzStep(n: number): number {
	if (n === 1) return 0;
	const isEven = n % 2 === 0;
	let steps = 0;
	let nextN = n;
	while (nextN !== 1) {
		if (!memo.has(nextN)) {
			memonextN,
		}
		steps++;
	}
	return steps;
}

function processQuery(input: string[]): { total: number } | null {
	let hasError = false;
	for (const line of input) {
		if (line.trim() === '') continue;
		const n = parseInt(line, 10);
		if (isNaN(n)) {
			hasError = true;
			continue;
		}
		if (!isFinite(n)) {
			hasError = true;
			continue;
		}
		const steps = collatzStep(n);
		return { total: steps };
	}
	return hasError ? null : { total: 0 };
}

function main() {
	const input = process.stdin.read().split('\n');
	const result = processQuery(input);
	if (!result) {
		process.exit(1);
	}
	console.log(`total=${result.total}`);
}

main();
