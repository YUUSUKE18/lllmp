import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
let validCount = 0;

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (!trimmed || !/^\s*[-+]?\d+\s*,\s*[-+]?\d+\s*$/.test(trimmed)) {
    return;
  }
  const parts = trimmed.split(',');
  const validPartCount = parts.filter((p) => /^\s*[-+]?\d+\s*$/.test(p)).length;
  if (validPartCount >= 1 && parts.length === validPartCount) {
    validCount++;
  }
});

rl.on('close', () => {
  process.stdout.write(`valid=${validCount}\n`);
});
