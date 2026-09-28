import { readFileSync } from "fs";

const input = readFileSync(0, "utf8").trim();
if (!input) {
  process.stdout.write("count=0 sum=0\n");
} else {
  const numbers = input.split(",").map((s) => {
    const trimmed = s.trim();
    if (trimmed.length === 0) return null;
    const parsed = parseInt(trimmed, 10);
    if (isNaN(parsed)) return null;
    return parsed;
  }).filter(Boolean);

  const uniqueNumbers = new Set(numbers);
  const count = uniqueNumbers.size;
  const sum = Array.from(uniqueNumbers).reduce((acc, n) => acc + n, 0);
  process.stdout.write(`count=${count} sum=${sum}\n`);
}
