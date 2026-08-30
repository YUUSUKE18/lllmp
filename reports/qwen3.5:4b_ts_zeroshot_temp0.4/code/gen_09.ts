import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) process.exit(0);

const parts = input.split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
const counts: Record<number, number> = {};
let sum = 0n;

for (const n of parts) {
  const key = String(n);
  counts[key] = (counts[key] || 0) + 1;
  sum += BigInt(n);
}

const uniqueCount = Object.keys(counts).length;
console.log(`count=${uniqueCount} sum=${sum}`);
