import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let totalCount = BigInt(0);
let totalCountBigInt = BigInt(0);

rl.on('line', (line) => {
  const parts = line.split(',').map((part) => part.trim());
  
  for (const part of parts) {
    if (!part || !/^\d+:\d+$/.test(part)) {
      continue;
    }

    const [valueStr, countStr] = part.split(':');
    const value = BigInt(valueStr);
    const count = BigInt(countStr);

    totalBigInt += count;
  }
});

rl.on('close', () => {
  process.stdout.write(`count=${totalCount} sum=${totalCountBigInt}\n`);
});
