import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

const regex = /^\s*(\d+(?:,\s*\d+)*)?\s*$/;

rl.on('line', (line) => {
  if (regex.test(line.trim())) {
    validCount++;
  }
});

rl.on('close', () => {
  process.stdout.write(`valid=${validCount}\n`);
});
