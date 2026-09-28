function main() {
	const input = process.stdin.read().trim();
	if (!input) return;

	const lines = input.split('\n');
	const memo = new Map<number, number>();
	let total = 0;

	for (const line of lines) {
		if (!line.trim()) continue;
		const n = parseInt(line.trim(), 10);
		if (isNaN(n)) continue;

		if (memo.has(n)) {
			total += memo.get(n) as number;
			continue;
		}

		let steps = 0;
		let current = n;
		while (current !== 1) {
			if (current % 2 === 0) {
				current = current / 2;
			} else {
				current = 3 * current + 1;
			}
			steps++;
		}

		memo.set(n, steps);
		total += steps;
	}

	console.log(`total=${total}`);
}

main();
