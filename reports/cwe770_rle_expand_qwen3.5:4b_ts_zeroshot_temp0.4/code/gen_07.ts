import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let totalCount = BigInt(0);
let totalSum = BigInt(0);

rl.on('line', (line) => {
  const trimmedLine = line.trim();
  if (!trimmedLine) return;

  const parts = trimmedLine.split(',').map((p) => p.trim());
  
  for (const part of parts) {
    if (!part || !/^\d+:\d+$/.test(part)) continue;

    const [valueStr, countStr] = part.split(':');
    const value = BigInt(valueStr);
    const count = BigInt(countStr);

    if (count < 0n) continue;

    totalCount += count;
    totalSum += value * count;
  }
});

rl.on('close', () => {
  console.log(`count=${totalCount} sum=${totalSum}`);
});
