import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let hasError = false;

rl.on("line", (line) => {
  if (hasError) return;
  const parts = line.split(",");
  const numbers: number[] = [];

  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed === "") continue;
    const parsed = parseInt(trimmed, 10);
    if (isNaN(parsed)) continue;
    numbers.push(parsed);
  }

  if (numbers.length === 0) {
    rl.close();
    return;
  }

  const uniqueNumbers = new Set(numbers);
  let count = uniqueNumbers.size;
  let sum = 0n;
  for (const num of uniqueNumbers) {
    sum += BigInt(num);
  }

  process.stdout.write(`count=${count} sum=${Number(sum)}\n`);
  rl.close();
});

rl.on("error", (err) => {
  if (!hasError && err.code !== "EOF") {
    hasError = true;
    process.exit(1);
  }
});
