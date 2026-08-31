import { createInterface } from "readline";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let count = 0;
let sum = BigInt(0);

rl.on("line", (line) => {
	const tokens = line.split(/,(\s+)/);

	for (const token of tokens) {
		const trimmed = token.trim();
		if (!trimmed) continue;

		const match = /^([0-9]+):\s*([0-9]+)\s*$/.exec(trimmed);
		if (!match || Number(match[1]) < 0) continue;

		const value: number | bigint = BigInt(Number.parseInt(match[1], 10));
		const repeats: bigint = Number.parseInt(match[2]);

		count += repeats;
		sum += value * BigInt(repeats);
	}
});

rl.on("close", () => {
	process.stdout.write(`count=${BigInt(count)} sum=${sum}\n`);
});
