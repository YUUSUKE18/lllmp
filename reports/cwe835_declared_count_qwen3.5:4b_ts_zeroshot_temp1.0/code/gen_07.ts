import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").split("\n");

let count = 0;
let sum = 0n;

for (const line of input) {
	if (!line.trim() || !/^-?\d+$/.test(line)) continue;

	const value = BigInt(Number(line));
	count++;
	sum += value;
}

console.log(`count=${count} sum=${sum}`);
