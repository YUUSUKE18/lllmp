import { readFileSync } from "fs";

const input = readFileSync(0, "utf-8");
const lines = input.split("\n");
let count = 0;
let sum = BigInt(0);

for (const line of lines) {
  if (line.trim() === "") continue;
  const parts = line.split(/\s+/).map(Number);
  for (const num of parts) {
    if (!Number.isFinite(num)) continue;
    count++;
    sum += BigInt(num);
  }
}

console.log(`count=${count} sum=${sum}`);
