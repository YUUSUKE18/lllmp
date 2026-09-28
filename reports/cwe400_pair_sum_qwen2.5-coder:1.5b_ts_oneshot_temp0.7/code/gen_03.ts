import { readFileSync } from "fs";

const lines = readFileSync("input.txt", "utf8").split("\n").filter(Boolean);
const target = parseInt(lines[0], 10);
const pairs = 0;

for (let i = 1; i < lines.length; i++) {
  const n = parseInt(lines[i], 10);
  if (isNaN(n)) continue;
  for (let j = i + 1; j < lines.length; j++) {
    const m = parseInt(lines[j], 10);
    if (isNaN(m)) continue;
    if (n + m === target) pairs++;
  }
}

console.log(`pairs=${pairs}`);
