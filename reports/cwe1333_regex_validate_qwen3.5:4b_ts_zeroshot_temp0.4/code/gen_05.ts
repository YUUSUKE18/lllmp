import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (trimmed === '') return;

  const parts = trimmed.split(',');
  let isNumber = true;

  for (const part of parts) {
    if (!part || !/^-?\d+$/.test(part)) {
      isNumber = false;
      break;
    }
  }

  if (isNumber) {
    validCount++;
  }
});

rl.on('close', () => {
  console.log(`valid=${validCount}`);
});
