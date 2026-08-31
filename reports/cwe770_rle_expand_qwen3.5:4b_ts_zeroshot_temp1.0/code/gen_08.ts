import { createInterface } from "readline";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

let totalValue = 0n;
let totalCount = 0n;

rl.on("line", (line) => {
	const pairs = line
		.trim()
		.split(",")
		.map((pair) => pair.trim())
		.filter((pair) => pair.length > 0);

	for (const pair of pairs) {
		const [valueStr, countStr] = pair.split(":").map((s) => s.trim());
		if (!valueStr || !countStr) continue;

		const value = BigInt(valueStr);
		const count = Number(countStr);

		if (isNaN(count) || count < 0) continue;

		totalCount += BigInt(count);
		totalValue += value * BigInt(count);
	}
});

rl.on("close", () => {
	console.log(`count=${totalCount.toString()} sum=${totalValue.toString()}\n`);
});
