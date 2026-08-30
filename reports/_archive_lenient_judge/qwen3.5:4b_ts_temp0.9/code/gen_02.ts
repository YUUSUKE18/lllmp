import { Readline } from "readline";

const rl = new Readline(process.stdin);

rl.on("data", (line) => {
	const input = line.trim();
	if (!input) return;

	let countMap: Map<number, number> | null = null;

	for (const char of input.split(",")) {
		const numString = Number(char);
		if (!Number.isNaN(numString) && !Number.isFinite(numString)) {
			countMap ??= new Map();
			countSet.add(numString as unknown as number);
		}
	}

});

rl.on("close", () => {
	const set = countMap.size;
	if (!set) return;
	
	let totalSum: bigint = 0n;
	for (const [num, cnt] of input.split(",")) {
		try {
			totalSum += BigInt(num);
		} catch {}
	}

	console.log(`count=${Number(set)} sum=${Number(totalSum)}`);
});
