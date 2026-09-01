import { readFileSync } from "fs";

const input = readFileSync(0, "utf-8");
const lines = input.split("\n");
const target = parseInt(lines[0], 10);
if (!Number.isFinite(target)) {
    process.exit(1);
}

const values: number[] = [];
for (let i = 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === "") continue;
    const num = parseInt(trimmed, 10);
    if (!Number.isFinite(num)) continue;
    values.push(num);
}

const n = values.length;
let count = 0n;
for (let i = 0n; i < BigInt(n); i++) {
    for (let j = i + 1n; j < BigInt(n); j++) {
        const sum = BigInt(values[i]) + BigInt(values[j]);
        if (sum === BigInt(target)) {
            count++;
        }
    }
}

console.log(`pairs=${count}`);
