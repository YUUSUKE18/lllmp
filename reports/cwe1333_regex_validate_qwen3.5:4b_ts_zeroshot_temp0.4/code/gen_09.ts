import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (trimmed === '') return;

  const parts = trimmed.split(',');
  const hasNonDigit = parts.some((part) => !/^-?\d+$/.test(part));

  if (!hasNonDigit && parts.length > 0) {
    validCount++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validCount}`);
});
