import * as fs from 'fs';

const memo = new Map<number, number>();

function collatz(n: number): number {
	if (n === 1) return 0;
	if (memo.has(n)) return memo.get(n)!;

	let steps = 0;
	let cur = n;

	while (cur !== 1) {
		steps++;
		cur = cur % 2 === 0 ? cur / 2 : cur * 3 + 1;
	}

	memo.set(n, steps);
	return steps;
}

function main() {
	const input = fs.readSync('/dev/stdin');
	let output: number = 0;

	for (const line of input.split('\n')) {
		if (!line.trim().length) continue;
		try {
			const n = parseInt(line.trim(), 10);
			output += collatz(n);
		} catch (_e) {
			continue;
		}
	}

	fs.writeSync('/dev/stdout', `total=${output}\n`);
}

main();
