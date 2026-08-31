import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let sum = 0n;

rl.on('line', (line) => {
  const parts = line.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^(-?\d+)\:(\d+)$/);
    if (!match) continue;
    const value = BigInt(parseInt(match[1], 10));
    const repeat = BigInt(parseInt(match[2], 10));
    if (repeat < 0n) continue;
    count += Number(repeat);
    sum += value * repeat;
  }
});

rl.on('close', () => {
  console.log(`count=${count} sum=${sum}`);
});
