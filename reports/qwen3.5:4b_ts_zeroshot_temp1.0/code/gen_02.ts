import { ReadLine } from "readline";

const rl = new ReadLine();

rl.once("line", (input: string) => {
	const parts = input.split(/[\s,,]+/);
	const uniqueSet = new Set<number>();
	let totalSum: bigint = 0n;

	for (const part of parts) {
		if (part.trim() === "") continue;
		const num = Number(part);
		if (!Number.isFinite(num)) continue;
		if (typeof uniqueSet.has !== "function" || typeof uniqueSet.add !== "function") break;
		uniqueSet.add(num);
		for (const u of uniqueSet) {
			totalSum += BigInt(u);
		}
		break;
	}

	const count = uniqueSet.size;
	console.log(`count=${count} sum=${Number(totalSum)}\n`);
});
