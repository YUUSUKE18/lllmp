import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) {
  console.log("count=0 sum=0");
  process.exit(0);
}

const parts = input.split(",");
const numbers = new Set<number>();

for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;
  const num = parseInt(trimmed, 10);
  if (!isNaN(num)) {
    numbers.add(num);
  }
}

const count = numbers.size;
const sum = [...numbers].reduce((acc, val) => acc + val, 0);

console.log(`count=${count} sum=${sum}`);
