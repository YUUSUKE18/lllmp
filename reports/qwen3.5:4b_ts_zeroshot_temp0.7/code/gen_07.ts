import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });

let count = 0;
let sum = BigInt(0);

rl.on('line', (line) => {
  const parts = line.trim().split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed || !/^-?\d+$/.test(trimmed)) continue;
    
    const value = Number(trimmed);
    if (isNaN(value)) continue;

    count++;
    sum += BigInt(value);
  }
});

rl.on('close', () => {
  console.log(`count=${count} sum=${sum}`);
});
